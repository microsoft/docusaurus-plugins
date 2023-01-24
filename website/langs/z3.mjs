import { readFileSync } from "node:fs";
import z3 from "z3-solver";

async function run() {
    const { Z3 } = await z3.init();
    const input = readFileSync(`./input.z3`, { encoding: "utf8" });
    const options = JSON.parse(
        readFileSync(`./options.json`, { encoding: "utf8" })
    );
    const { timeout = 10000 } = options;
    const cfg = Z3.mk_config();
    const ctx = Z3.mk_context(cfg);
    Z3.del_config(cfg);

    const timeStart = new Date().getTime();

    Z3.global_param_set("timeout", String(timeout));

    let output = "";
    let error = "";

    try {
        output = (await Z3.eval_smtlib2_string(ctx, input)) ?? "";
    } catch (e) {
        // error with running z3
        error = e.message ?? "Error message is empty";
    } finally {
        Z3.del_context(ctx);
    }
    if (/unknown/.test(output)) {
        const timeEnd = new Date().getTime();
        if (timeEnd - timeStart >= timeout) {
            output = output + "\nZ3 timeout\n";
        }
    }

    console.log(String(output));
    if (error) console.error(error);
}

(async () => {
    try {
        await run();
        process.exit(0);
    } catch (e) {
        console.error(e);
        process.exit(1);
    }
})();
