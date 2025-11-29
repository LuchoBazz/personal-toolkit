const PhoneNumberGenerator = require('phone-number-generator-js');

console.log('Exports:', Object.keys(PhoneNumberGenerator));
console.log('Type of default export:', typeof PhoneNumberGenerator);

// Try to find a way to get supported countries
// Common patterns: .countries, .getCountries(), or just try to generate for a few
try {
    if (PhoneNumberGenerator.getCountries) {
        console.log('Countries:', PhoneNumberGenerator.getCountries());
    } else if (PhoneNumberGenerator.countries) {
        console.log('Countries:', PhoneNumberGenerator.countries);
    } else {
        console.log('No obvious countries list found.');
    }
} catch (e) {
    console.log('Error checking countries:', e.message);
}

// Try to generate a number
try {
    // Assuming generate(countryCode) or similar
    const gen = PhoneNumberGenerator.generate || PhoneNumberGenerator.default?.generate || PhoneNumberGenerator;
    if (typeof gen === 'function') {
        console.log('Generated ES:', gen('ES'));
        console.log('Generated US:', gen('US'));
    } else if (typeof gen.generate === 'function') {
        console.log('Generated ES (method):', gen.generate('ES'));
    }
} catch (e) {
    console.log('Error generating:', e.message);
}
