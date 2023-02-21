import { ObjectSchema, TypeCode } from "pip-services3-commons-nodex";


export default new ObjectSchema(false).withOptionalProperty('date', TypeCode.DateTime)
    .withRequiredProperty('senderUid', TypeCode.String)
    .withRequiredProperty('text', TypeCode.String)
    .withOptionalProperty('offerId', TypeCode.String);