const { exception } = require('react-ga');
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
    test('if owner is outside of Omaha but in Nebraska', () => {
        const parcel = { OWNER_CITY: 'LINCOLN', OWNER_STAT: 'NE', PROP_CITY: 'OMAHA', };
        const actual = parcelsParser.includeInOutOfOmaha(parcel)
        expect(actual).toBe(true);
    });

    test('if owner is inside of Omaha but outside Nebraska', () => {
        const parcel = { OWNER_CITY: 'OMAHA', OWNER_STAT: 'GA', PROP_CITY: 'OMAHA', };
        const actual = parcelsParser.includeInOutOfOmaha(parcel)
        expect(actual).toBe(false);
    })

    test('if owner is inside of Omaha and in Nebraska', () => {
        const parcel = { OWNER_CITY: 'OMAHA', OWNER_STAT: 'NE', PROP_CITY: 'OMAHA', };
        const actual = parcelsParser.includeInOutOfOmaha(parcel)
        expect(actual).toBe(false); 
    })

    test('if owner is outside of Omaha and outside Nebraska', () => {
        const parcel = { OWNER_CITY: 'BATON ROUGE', OWNER_STAT: 'LA', PROP_CITY: 'OMAHA',};
        const actual = parcelsParser.includeInOutOfOmaha(parcel)
        expect(actual).toBe(false); 
    })
})

describe('ownerOutOfState test', () => {
    test('owner out of Omaha and Nebraska', () => {
        const parcel = { OWNER_CITY: 'JACKSON', OWNER_STAT: 'MS', PROP_CITY: 'OMAHA',};
        const actual = parcelsParser.ownerOutOfState(parcel)
        expect(actual).toBe(true); 
    })
})

