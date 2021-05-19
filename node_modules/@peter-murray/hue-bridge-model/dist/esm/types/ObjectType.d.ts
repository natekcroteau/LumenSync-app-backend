import { BaseType } from './BaseType';
import { ObjectTypeConfig } from './BaseType';
interface LooseObject {
    [key: string]: any;
}
export declare class ObjectType extends BaseType<LooseObject> {
    types?: BaseType<any>[];
    childRequiredKeys: string[];
    constructor(config: ObjectTypeConfig);
    _convertToType(val: LooseObject): import("./BaseType").NullableTypeValue<LooseObject>;
    _getObject(val: LooseObject): LooseObject;
    _validateRequiredKeys(result: any): void;
}
export {};
