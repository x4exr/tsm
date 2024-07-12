import {program} from "commander";
import * as path from "path";
import * as fs from "node:fs";
import {parser} from "../lib";

program.command("assemble")
    .description("Assemble a xtsm file into a binary executable.")
    .argument("<file_path>", "Path to the file that must be assembled.")
    .action((file_path: string) => {
        console.log("-- Accessing file.");

        let file: string;
        try {
            let real_path = path.join(process.cwd(), file_path);
            file = fs.readFileSync(real_path).toString();
        } catch (error) {
            console.error("-- Failed to access file due to error:", error);
        }

        console.log("-- Parsing tokens.");

        let tokens = parser.parse(file);
        console.log(tokens);
    });