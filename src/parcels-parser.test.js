const parcelsParser = require('../server/parcels-parser');

test('isOwnersProperty returns true if addressLA and address2 match ', () => {
    const actual= parcelsParser.isOwnersProperty({ADDRESS_LA : 'hello', ADDRESS2 : 'hello',})
    expect(actual).toBe(true);
});

test('isOwnersProperty returns false if addressLA and address2 dont match ', () => {
    const actual= parcelsParser.isOwnersProperty({ADDRESS_LA : 'hello', ADDRESS2 : 'bye',})
    expect(actual).toBe(false);
});

test('includeInLowCondition if condition is low and property is in Omaha and if its not owners property ', () => {
    const actual= parcelsParser.includeInLowCondition({ADDRESS_LA : 'hello', ADDRESS2 : 'bye', CONDITION : 'LOW', PROP_CITY : 'OMAHA', })
    expect(actual).toBe(true);
});

test('includeInLowCondition if condition is worn out and property is in Omaha and if its not owners property ', () => {
    const actual= parcelsParser.includeInLowCondition({ADDRESS_LA : 'hello', ADDRESS2 : 'bye', CONDITION : 'WORN OUT', PROP_CITY : 'OMAHA', })
    expect(actual).toBe(true);
});

test('includeInLowCondition if condition is poor and property is in Omaha and if its not owners property ', () => {
    const actual= parcelsParser.includeInLowCondition({ADDRESS_LA : 'hello', ADDRESS2 : 'bye', CONDITION : 'POOR', PROP_CITY : 'OMAHA', })
    expect(actual).toBe(true);
});

test('includeInLowCondition if condition is low and property is not in Omaha and if its not owners property ', () => {
    const actual= parcelsParser.includeInLowCondition({ADDRESS_LA : 'hello', ADDRESS2 : 'bye', CONDITION : 'LOW', PROP_CITY : 'Chicago', })
    expect(actual).toBe(false);
});

test('includeInLowCondition if condition is worn out and property is in Omaha and if it is owners property ', () => {
    const actual= parcelsParser.includeInLowCondition({ADDRESS_LA : 'hello', ADDRESS2 : 'hello', CONDITION : 'WORN OUT', PROP_CITY : 'OMAHA', })
    expect(actual).toBe(false);
});

test('includeInLowCondition if condition is good and property is in Omaha and if its not owners property ', () => {
    const actual= parcelsParser.includeInLowCondition({ADDRESS_LA : 'hello', ADDRESS2 : 'bye', CONDITION : 'GOOD', PROP_CITY : 'OMAHA', })
    expect(actual).toBe(false);
});