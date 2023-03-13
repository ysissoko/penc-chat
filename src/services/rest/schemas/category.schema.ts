import { ObjectSchema, TypeCode } from "pip-services3-commons-nodex";

export default new ObjectSchema(false)
    .withRequiredProperty('id', TypeCode.Integer)
    .withRequiredProperty('name', TypeCode.String);
