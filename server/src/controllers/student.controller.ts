import { Prisma } from "@prisma/client";
import { NextFunction, Request, Response } from "express";
import csvParser from "csv-parser";
import fs from "fs";

import { ExpressError } from "@lib/ExpressError";
import prisma from "@lib/prisma";
import { ifIsError } from "@utils";

export const getAllStudents = async (req: Request, res: Response) => {
  const students = await prisma.student.findMany();

  res.status(200).json({
    status: "success",
    data: students,
  });
};

export const uploadStudents = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (!req.file) {
    return next(new ExpressError("No file uploaded", 400));
  }

  const { file } = req;

  const results: Prisma.StudentCreateInput[] = [];
  fs.createReadStream(file.path)
    .pipe(
      csvParser({
        headers: ["name", "rollno", "address", "institute", "course", "email"],
        strict: true,
      })
    )
    .on("data", (data) => {
      if (data.name === "Name") return;

      results.push({
        name: data.name,
        rollno: Number.parseInt(data.rollno, 10),
        address: data.address,
        institute: data.institute,
        course: data.course,
        email: data.email,
      });
    })
    .on("end", async () => {
      try {
        await prisma.student.createMany({
          data: results,
          skipDuplicates: true,
        });

        // Delete the file after upload
        fs.unlinkSync(file.path);

        res.status(200).json({
          status: "success",
          message: "Students uploaded successfully",
        });
      } catch (error: unknown) {
        // Delete the file after upload
        fs.unlinkSync(file.path);

        ifIsError(error, (error) => {
          console.log(error);
          next(new ExpressError(error.message, 500));
        });

        next(new ExpressError("Something went wrong", 500));
      }
    });
};

export const downloadStudents = async (req: Request, res: Response) => {
  const students = await prisma.student.findMany();
  const headers = [
    "Name",
    "Roll No",
    "Address",
    "Institute",
    "Course",
    "Email",
  ];

  let csv = headers.join(",") + "\n";
  students.forEach((student) => {
    csv += `"${student.name}","${student.rollno}","${student.address}","${student.institute}","${student.course}","${student.email}"\n`;
  });

  res.setHeader("Content-Type", "text/csv");
  res.setHeader("Content-Disposition", "attachment; filename=students.csv");
  res.status(200).send(csv);
};
