"use server";

import { promises as fs } from "fs";
import { parse } from 'yaml'

export const getModules = async() =>{
    const file = await fs.readFile(process.cwd() + '/public/marketplace/modules.yaml', 'utf8');
    return parse(file);
};