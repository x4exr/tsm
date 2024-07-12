import {program} from "commander";

program
    .name("x4exr assembler. xtsm or tsm.")
    .description("A typescript based assembler for the arrseq lightning processor architecture")
    .version("0.0.1");

import "./main/assemble";

program.parse();