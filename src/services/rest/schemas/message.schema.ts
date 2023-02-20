import { ObjectSchema, TypeCode } from "pip-services3-commons-nodex";

const messageSchema = new ObjectSchema(false);

messageSchema.withOptionalProperty('date', TypeCode.DateTime);
messageSchema.withRequiredProperty('senderUid', TypeCode.String);
messageSchema.withRequiredProperty('text', TypeCode.String);
messageSchema.withOptionalProperty('offerId', TypeCode.String);

export default messageSchema;