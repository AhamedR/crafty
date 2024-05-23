import ICraft from "@/models/Craft"
import ICustomer from "@/models/Customer"

const validateOrder = ({
  customerName,
  address,
  contact,
}: ICustomer): string[] => {
  const errors: string[] = []

  if (!customerName || !/^[A-Za-z]/.test(customerName)) {
    errors.push('customerName')
  }

  if (!contact || !/^\+?\d{10}$/.test(contact)) {
    errors.push('contact')
  }

  if (!address) {
    errors.push('address')
  }

  return errors
}

const validateCraft = ({
  title,
  description,
  category,
  price,
  imageUrl,
  availableQuantity,
}: ICraft): string[] => {
  const errors: string[] = []

  if (!title) {
    errors.push('title')
  }

  if (!description) {
    errors.push('description')
  }

  if (!category) {
    errors.push('category')
  }

  if (price <= 0 || isNaN(price)) {
    errors.push('price')
  }

  if (!imageUrl) {
    errors.push('imageUrl')
  }

  if (!availableQuantity || isNaN(availableQuantity) || availableQuantity <= 0) {
    errors.push('availableQuantity')
  }

  return errors
}

export {validateOrder, validateCraft}
