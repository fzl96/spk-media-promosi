import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { z } from "zod";
import { Prisma, Criteria,  } from "@prisma/client";

interface Evaluation {
  criteriaId: string;
  nilai: number;
}

interface Alternative {
  name: string;
  evaluation: Array<Evaluation>;
}

export async function GET() {
  try {
    const criteria = await db.alternative.findMany({
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

    if (!criteria) {
      return NextResponse.json(criteria);
    }

    const newCriteria = criteria.map((item) => ({
      id: item.id,
      name: item.name,
      evaluation: item.evaluation.map((item) => ({
        criteriaId: item.criteria.id,
        criteriaName: item.criteria.name,
        criteriaWeight: item.criteria.weight,
        criteriaType: item.criteria.type,
        criteriaCode: item.criteria.code,
        nilai: item.nilai,
      }))
    }));

    return NextResponse.json(newCriteria);
  } catch (error) {
    return NextResponse.error();
  }
}

export async function POST(request: Request) {
  try {
    const data: Alternative = await request.json();
    
    const alternative = await db.alternative.create({
      data: {
        name: data.name,
        evaluation: {
          create: data.evaluation.map((item) => ({
            criteria: {
              connect: {
                id: item.criteriaId
              }
            },
            nilai: item.nilai,
          }))
        }
      },
    });

    return NextResponse.json(alternative, { status: 201 });
  } catch (error) {
    return NextResponse.error();
  }
}


