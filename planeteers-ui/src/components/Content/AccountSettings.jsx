import { FormControl, FormLabel, Grid, Input, Select } from '@chakra-ui/react'

function AccountSettings() {
  return (
    <Grid
      templateColumns={{ base: 'repeat(1, 1fr)', md: 'repeat(2, 1fr)' }}
      gap={6}
    >
      <FormControl id="firstName">
        <FormLabel>First Name</FormLabel>
        <Input focusBorderColor="brand.blue" type="text" placeholder="Tim" />
      </FormControl>
      <FormControl id="lastName">
        <FormLabel>Last Name</FormLabel>
        <Input focusBorderColor="brand.blue" type="text" placeholder="Cook" />
      </FormControl>
<<<<<<< HEAD
=======
      <FormControl id="phoneNumber">
        <FormLabel>Phone Number</FormLabel>
        <Input
          focusBorderColor="brand.blue"
          type="tel"
          placeholder="(408) 996–1010"
        />
      </FormControl>
>>>>>>> f3ce78f6eb5a5daf3364f5e29a703a8229dd8ee0
      <FormControl id="emailAddress">
        <FormLabel>Email Address</FormLabel>
        <Input
          focusBorderColor="brand.blue"
          type="email"
          placeholder="tcook@apple.com"
        />
      </FormControl>
<<<<<<< HEAD
      
=======
      <FormControl id="city">
        <FormLabel>City</FormLabel>
        <Select focusBorderColor="brand.blue" placeholder="Select city">
          <option value="saint louis">Saint Louis</option>
          <option value="kansas city">Kansas City</option>
          <option value="philadelphia">Philadelphia</option>
          <option value="new york" selected>
            New York
          </option>
          <option value="london">London</option>
          <option value="netherland">Netherland</option>
          <option value="poland">Poland</option>
        </Select>
      </FormControl>
      <FormControl id="country">
        <FormLabel>Country</FormLabel>
        <Select focusBorderColor="brand.blue" placeholder="Select country">
          <option value="america" selected>
            America
          </option>
          <option value="england">England</option>
          <option value="poland">Poland</option>
        </Select>
      </FormControl>
>>>>>>> f3ce78f6eb5a5daf3364f5e29a703a8229dd8ee0
    </Grid>
  )
}

export default AccountSettings