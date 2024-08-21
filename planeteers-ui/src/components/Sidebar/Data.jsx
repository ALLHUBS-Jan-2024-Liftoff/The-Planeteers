import { Box, Text, VStack } from '@chakra-ui/react'

const list = [
  {
    id: 1,
    name: 'Achievements Unlocked',
    value: 32,
    color: 'yellow',
  },
  {
    id: 2,
    name: 'Credits',
    value: 26,
    color: 'green',
  },
<<<<<<< HEAD
=======
  {
    id: 3,
    name: 'Play Time Hours',
    value: 6,
    color: 'cadet',
  },
>>>>>>> f3ce78f6eb5a5daf3364f5e29a703a8229dd8ee0
]

function Data() {
  return (
    <VStack as="ul" spacing={0} listStyleType="none">
      {list.map(item => (
        <Box
          key={item.id}
          as="li"
          w="full"
          py={3}
          px={5}
          d="flex"
          alignItems="center"
          justifyContent="space-between"
          borderBottomWidth={1}
          borderColor="brand.light"
        >
          <Text color="brand.dark">{item.name}</Text>
          <Text color={`brand.${item.color}`} fontWeight="bold">
            {item.value}
          </Text>
        </Box>
      ))}
    </VStack>
  )
}

export default Data