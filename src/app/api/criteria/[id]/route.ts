import { db } from "@/lib/db"
import { NextResponse } from "next/server";
import { Prisma } from "@prisma/client";

export async function DELETE(req: Request,
  { params }: { params: { id: string } }
  ) {
    const { id } = params;
    try {
      const criteria = await db.criteria.delete({
          where: { id },
      });
      return NextResponse.json(criteria, { status: 200 });
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === "P2025") {
          return NextResponse.json({ error: "Kriteria tidak ditemukan"}, { status: 404 });
        } else if (error.code == "P2003") {
          return NextResponse.json({ error: "Kriteria tidak dapat dihapus karena masih digunakan"}, { status: 400 });
        }
      }
      return NextResponse.error();
    }
}

export async function GET(req: Request,
  { params }: { params: { id: string } }) {
  const { id } = params;
  try {
    const criteria = await db.criteria.findUnique({
      where: { id },
    });
    return NextResponse.json(criteria);
  } catch (error) {
    return NextResponse.error();
  }
}

export async function PATCH(req: Request,
  { params }: { params: { id: string } }
  ) {
    const { id } = params;
    try {
      const data = await req.json();
      const criteria = await db.criteria.update({
          where: { id },
          data,
      });
      return NextResponse.json(criteria, { status: 200 });
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