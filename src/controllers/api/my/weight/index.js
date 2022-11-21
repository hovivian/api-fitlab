import prisma from '../../../_helpers/prisma.js'
import handleErrors from '../../../_helpers/handle-errors.js'

const controllersApiMyWeightIndex = async (req, res) => {
  try {
    const { session: { user: { id } } } = req
    const foundWeights = await prisma.weight.findMany({
      where: { userId: id },
      include: {
        user: true
      }
    })
    return res.status(200).json(foundWeights)
  } catch (err) {
    return handleErrors(res, err)
  }
}

export default controllersApiMyWeightIndex
