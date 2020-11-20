const parcelsParser = require('../server/parcels-parser');

describe('isOwnersProperty test', () => {
    test('if addressLA and address2 match ', () => {
        const actual= parcelsParser.isOwnersProperty({ADDRESS_LA : 'hello', ADDRESS2 : 'hello',})
        expect(actual).toBe(true);
    });
    
    test('if addressLA and address2 dont match ', () => {
        const actual= parcelsParser.isOwnersProperty({ADDRESS_LA : 'hello', ADDRESS2 : 'bye',})
        expect(actual).toBe(false);
    });
})

describe('includeInLowCondition test', () => {
    test('if condition is low and property is in Omaha and if its not owners property ', () => {
        const parcel = {ADDRESS_LA : 'hello', ADDRESS2 : 'bye', CONDITION : 'LOW', PROP_CITY : 'OMAHA', }
        const actual= parcelsParser.includeInLowCondition(parcel)
        expect(actual).toBe(true);
    });
    
    test('if condition is worn out and property is in Omaha and if its not owners property ', () => {
        const parcel = {ADDRESS_LA : 'hello', ADDRESS2 : 'bye', CONDITION : 'WORN OUT', PROP_CITY : 'OMAHA', }
        const actual= parcelsParser.includeInLowCondition(parcel)
        expect(actual).toBe(true);
    });
    
    test('if condition is poor and property is in Omaha and if its not owners property ', () => {
        const parcel = {ADDRESS_LA : 'hello', ADDRESS2 : 'bye', CONDITION : 'POOR', PROP_CITY : 'OMAHA', }
        const actual= parcelsParser.includeInLowCondition(parcel)
        expect(actual).toBe(true);
    });
    
    test('if condition is low and property is not in Omaha and if its not owners property ', () => {
        const parcel = {ADDRESS_LA : 'hello', ADDRESS2 : 'bye', CONDITION : 'LOW', PROP_CITY : 'Chicago', }
        const actual= parcelsParser.includeInLowCondition(parcel)
        expect(actual).toBe(false);
    });
    
    test('if condition is worn out and property is in Omaha and if it is owners property ', () => {
        const parcel = { ADDRESS_LA: 'hello', ADDRESS2: 'hello', CONDITION: 'WORN OUT', PROP_CITY: 'OMAHA', };
        const actual= parcelsParser.includeInLowCondition(parcel)
        expect(actual).toBe(false);
    });
    
    test('if condition is good and property is in Omaha and if its not owners property ', () => {
        const parcel = { ADDRESS_LA: 'hello', ADDRESS2: 'bye', CONDITION: 'GOOD', PROP_CITY: 'OMAHA', };
        const actual= parcelsParser.includeInLowCondition(parcel)
        expect(actual).toBe(false);
    });
})

describe('includeInOutOfOmaha test', () => {
    test('if owner is outside of Omaha', () => {
        const parcel = { OWNER_CITY: 'ATLANTA', OWNER_STAT: 'GEORGIA', PROP_CITY: 'OMAHA', };
        const actual = parcelsParser.includeInOutOfOmaha(parcel)
        expect(actual).toBe(false);
    });
})
