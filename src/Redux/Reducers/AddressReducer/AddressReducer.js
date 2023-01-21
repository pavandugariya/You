const initialState = {
    addressData: {
        firstName: 'XYZ',
        lastName: 'ABC',
        addressOne: 'Madhya Pradesh India',
        addressTwo: '',
        city: '',
        state: '',
        country: '',
        pinCode: '',
        mobileNo: 'xxxxxxxxxx',
        BillingfirstName: 'Prem',
        BillinglastName: 'Mehta',
        BillingaddressOne: 'Codes For Tomorrow Veena nagar B-35 MR-10 Bhopal',
        BillingaddressTwo: '',
        Billingcity: '',
        Billingstate: '',
        Billingcountry: '',
        BillingpinCode: '',
        BillingmobileNo: 'xxxxxxxxxx',
    },
    sameAddress: true,


};


const AddressReducer = (state = initialState, action) => {

    switch (action.type) {
        case 'ADD_ADDRESS':
            return {
                ...state,
                addressData: action.payload,
            };
        case 'SAME_ADDRESS':
            return {
                ...state,
                sameAddress: action.payload,
            };
        case 'FIRST_NAME':
            return {
                ...state,
                firstName: action.payload,
            };
        case 'LAST_NAME':
            return {
                ...state,
                lastName: action.payload,
            };
        case 'ADDRESS_ONE':
            return {
                ...state,
                addressOne: action.payload,
            };
        case 'ADDRESS_TWO':
            return {
                ...state,
                addressTwo: action.payload,
            };
        case 'CITY':
            return {
                ...state,
                city: action.payload,
            };
        case 'STATE':
            return {
                ...state,
                state: action.payload,
            };
        case 'COUNTRY':
            return {
                ...state,
                country: action.payload,
            };
        case 'PIN_CODE':
            return {
                ...state,
                pinCode: action.payload,
            };
        case 'MOBILE_NO':
            return {
                ...state,
                mobileNo: action.payload,
            };
        case 'BILLING_FIRST_NAME':
            return {
                ...state,
                BillingfirstName: action.payload,
            };
        case 'BILLING_LAST_NAME':
            return {
                ...state,
                BillinglastName: action.payload,
            };
        case 'BILLING_ADDRESS_ONE':
            return {
                ...state,
                BillingaddressOne: action.payload,
            };
        case 'BILLING_ADDRESS_TWO':
            return {
                ...state,
                BillingaddressTwo: action.payload,
            };
        case 'BILLING_CITY':
            return {
                ...state,
                Billingcity: action.payload,
            };
        case 'SBILLING_TATE':
            return {
                ...state,
                Billingstate: action.payload,
            };
        case 'BILLING_COUNTRY':
            return {
                ...state,
                Billingcountry: action.payload,
            };
        case 'BILLING_PIN_CODE':
            return {
                ...state,
                BillingpinCode: action.payload,
            };
        case 'BILLING_MOBILE_NO':
            return {
                ...state,
                BillingmobileNo: action.payload,
            };
        default:
            return state;
    }
};

export default AddressReducer;