// import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { getServerSession } from 'next-auth';
import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { z } from 'zod';
import { Prisma } from '@prisma/client';

interface Criteria {
  code: string;
  name: string;
  weight: number;
  type: string;
}

const criteriaSchema = z.object({
  code: z.string(),
  name: z.string(),
  weight: z.number(),
  type: z.string(),
});

export async function GET() {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return NextResponse.json({ error: 'Not authenticated' }, { status: 401 });
    }

    const criteria = await db.criteria.findMany();

    return NextResponse.json(criteria);

  } catch (error) {
    return NextResponse.error();
  }
}

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return NextResponse.json({ error: 'Not authenticated' }, { status: 401 });
    }

    const data: Criteria = await req.json();
    const validatedData = criteriaSchema.parse(data);

    const criteria = await db.criteria.create({
      data: {
        code: validatedData.code.toLocaleUpperCase(),
        name: validatedData.name,
        weight: validatedData.weight,
        type: validatedData.type,
      },
    });

    return NextResponse.json(criteria, { status: 201 });

  } catch (error){
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === 'P2002') {
        return NextResponse.json({ error: 'Kode sudah ada' }, { status: 400 });
      }
    }
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.issues }, { status: 400 });
    }
    return NextResponse.error();
  }
}