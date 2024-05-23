import CraftItem from '../molecules/CraftItem'
import Craft from '@/models/Craft'

interface CraftCardProps {
  crafts: Craft[]
}

const CraftCards = ({ crafts }: CraftCardProps) => {
  return (
    <>
      {crafts.map((craft) => (
        craft.status && <CraftItem key={craft.id} craft={craft}/>
      ))}
    </>
  )
}

export default CraftCards
