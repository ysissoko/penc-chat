import { ObjectSchema, TypeCode } from "pip-services3-commons-nodex";

export default new ObjectSchema(false)
    .withRequiredProperty('id', TypeCode.Integer)
    .withRequiredProperty('category', TypeCode.Map)
    .withRequiredProperty('price', TypeCode.Float)
    .withRequiredProperty('name', TypeCode.String)
    .withRequiredProperty('description', TypeCode.String)
    .withOptionalProperty('photos', TypeCode.Array)
