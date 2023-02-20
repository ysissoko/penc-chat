import { ObjectSchema, TypeCode } from "pip-services3-commons-nodex";

const convSchema = new ObjectSchema(false);

convSchema.withRequiredProperty('participantsUid', TypeCode.Array);
convSchema.withRequiredProperty('message', TypeCode.String);

export default convSchema;