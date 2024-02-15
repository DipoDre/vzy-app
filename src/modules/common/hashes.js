import bcrypt from "bcrypt";
import { createHash } from "crypto";

export const hash = input => {
	const salt = bcrypt.genSaltSync(10);
	const hashedValue = bcrypt.hashSync(input, salt);
	return hashedValue;
};

export const decrypt = (input, record) => bcrypt.compareSync(input, record);

export const createSha512Hash = value => {
	const sha512 = createHash("sha512");
	return sha512.update(value, "utf-8").digest("hex");
};
