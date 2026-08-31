"use server";

import { redirect } from "next/navigation";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";

export async function createExpense(formData: FormData) {
  const session = await auth();

  if (!session?.user?.id) {
    redirect("/login");
  }

  const title = formData.get("title") as string;
  const amount = Number(formData.get("amount"));
  const category = formData.get("category") as string;
  const description = formData.get("description") as string;
  const date = new Date(formData.get("date") as string);

  await prisma.expense.create({
    data: {
      title,
      amount,
      category,
      description,
      date,
      userId: Number(session.user.id),
    },
  });

  redirect("/expenses");
}

export async function updateExpense(formData: FormData) {
  const session = await auth();

  if (!session?.user?.id) {
    redirect("/login");
  }

  const id = Number(formData.get("id"));
  const title = formData.get("title") as string;
  const amount = Number(formData.get("amount"));
  const category = formData.get("category") as string;
  const description = formData.get("description") as string;
  const date = new Date(formData.get("date") as string);

  await prisma.expense.update({
    where: {
      id,
      userId: Number(session.user.id),
    },
    data: {
      title,
      amount,
      category,
      description,
      date,
    },
  });

  redirect("/expenses");
}

export async function deleteExpense(formData: FormData) {
  const session = await auth();

  if (!session?.user?.id) {
    redirect("/login");
  }

  const id = Number(formData.get("id"));

  await prisma.expense.delete({
    where: {
      id,
      userId: Number(session.user.id),
    },
  });

  redirect("/expenses");
}