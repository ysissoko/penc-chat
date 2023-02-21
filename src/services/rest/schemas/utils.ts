import { BadRequestException, Schema, ValidationResult } from "pip-services3-commons-nodex";

export default class Utils {
    static validateSchema(object: any, schema: Schema, correlationId: string | null = null) {
        const validationResults: ValidationResult[] = schema.validate(object)
        const codes: string = validationResults.map((result: ValidationResult) => result.getCode()).join(',');
        const messages: string = validationResults.map((result: ValidationResult) => result.getMessage()).join(',');
        if (validationResults.length > 0) throw new BadRequestException(correlationId ?? "", codes, messages);
    }
}