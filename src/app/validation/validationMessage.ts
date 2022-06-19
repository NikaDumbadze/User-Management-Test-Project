export const VALIDATION_MESSAGES = {
  firstName: {
    required: 'First name is required',
    minlength: ' The first name must be longer than 3 characters',
  },

  lastName: {
    required: 'Last name is required',
    maxlength: 'The last name must be less than 20 characters',
  },

  personalNo: {
    required: 'Personal number is required',
    minlength: 'The personal number must consist of 11 numbers',
  },

  email: {
    required: 'Email is required',
    email: 'Enter a valid email',
  },

  dateOfBirth: {
    required: 'Date of birth required',
  },
};
