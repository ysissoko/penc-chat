import { ObjectSchema, TypeCode } from "pip-services3-commons-nodex";

export default new ObjectSchema(false)
    .withRequiredProperty('participantsUid', TypeCode.Array)
    .withRequiredProperty('messages', TypeCode.Array)
    .withRequiredProperty('product', TypeCode.Map);
