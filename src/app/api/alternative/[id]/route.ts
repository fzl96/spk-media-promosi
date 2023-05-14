import { db } from "@/lib/db"
import { NextResponse } from "next/server";
import { Prisma } from "@prisma/client";


interface Evaluation {
  criteriaId: string;
  nilai: number;
}

interface Alternative {
  name: string;
  evaluation: Array<Evaluation>;
}

export async function DELETE(req: Request,
  { params }: { params: { id: string } }
  ) {
    const { id } = params;
    try {
      const evaluation = db.evaluation.deleteMany({
        where: {
          alternativeId: id,
        }
      })

      const alternative = db.alternative.delete({
        where: {
          id: id,
        }
      })
      const result = await db.$transaction([evaluation, alternative])
        
      return NextResponse.json({message: "berhasil menghapus"}, { status: 200 });
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === "P2025") {
          return NextResponse.json({ error: "Alternatif tidak ditemukan"}, { status: 404 });
        } else if (error.code == "P2003") {
          return NextResponse.json({ error: "Alternatif tidak dapat dihapus karena masih digunakan"}, { status: 400 });
        }
      }
      return NextResponse.error();
    }
}

export async function GET({ params }: {
  params: { id: string }
}) {
  const { id } = params;
  try {
    const alternative = await db.alternative.findUnique({
      where: { id },
      include: {
        evaluation: {
          select: {
            criteria: {
              select: {
                id: true,
                name: true,
                weight: true,
                type: true,
                code: true,
              }
            },
            nilai: true,
          }
        }
      }
    });
    if (!alternative) {
      return NextResponse.json(alternative)
    }
    return NextResponse.json({
      id: alternative.id,
      name: alternative.name,
      evaluation: alternative.evaluation.map((alternative) => ({
        criteriaId: alternative.criteria.id,
        criteriaName: alternative.criteria.name,
        criteriaWeight: alternative.criteria.weight,
        criteriaType: alternative.criteria.type,
        criteriaCode: alternative.criteria.code,
        nilai: alternative.nilai,
      }))
   })
  } catch (error) {
    return NextResponse.error();
  }
}

export async function PATCH(req: Request,
  { params }: { params: { id: string } }
  ) {
    const { id } = params;

    try {
      const data: Alternative = await req.json();
      const previousEvaluation = await db.evaluation.findMany({
        where: {
          alternativeId: id,
        }
      })

      const itemToCreate = data.evaluation.filter(
        (item) => !previousEvaluation.find((i) => i.criteriaId === item.criteriaId)
      )

      const itemToUpdate = data.evaluation.filter(
        (item) => previousEvaluation.find((i) => i.criteriaId === item.criteriaId)
      )

      const itemToDelete = previousEvaluation.filter(
        (item) => !data.evaluation.find((i) => i.criteriaId === item.criteriaId)
      )

      const updateData: Prisma.AlternativeUpdateInput = {
        name: data.name,
      };

      if (data.evaluation.length > 0) {
        updateData.evaluation = {
          create: itemToCreate.map((item) => ({
            criteria: {
              connect: {
                id: item.criteriaId,
              },
            },
            nilai: item.nilai,
          })),
          update: itemToUpdate.map((item) => ({
            where: {
              alternativeId_criteriaId: {
                alternativeId: id,
                criteriaId: item.criteriaId,
              }
            },
            data: {
              nilai: item.nilai,
            }
          })),
          delete: itemToDelete.map((item) => ({
            alternativeId_criteriaId: {
              alternativeId: id,
              criteriaId: id,
            }
          })),
        }
      }
      
      const alternative = await db.alternative.update({
        where: {
          id: id,
        },
        data: updateData,
      })
      
      return NextResponse.json(alternative, { status: 200 });
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === "P2025") {
          return NextResponse.json({ error: "Kriteria tidak ditemukan"}, { status: 404 });
        } else if (error.code === "P2002") {
          return NextResponse.json({ error: "Kode kriteria sudah ada"}, { status: 400 });
        }
      }

      return NextResponse.error();
    }
}