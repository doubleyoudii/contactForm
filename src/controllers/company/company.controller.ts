import { Controller, Delete, Get, Patch, Post, Put } from "@mayajs/core";
import { Request, Response, NextFunction } from "express";
import { CompanyServices } from "./company.service";
import { Check } from "@mayajs/common";

@Controller({
  model: "./company.model",
  route: "/company",
})
export class CompanyController {
  // Inject SampleServices
  constructor(private services: CompanyServices) {}


  //Company Feature will be added soon
}
