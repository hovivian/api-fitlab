import yup from 'yup'

import prisma from '../../../_helpers/prisma.js'
import handleErrors from '../../../_helpers/handle-errors.js'

const createSchema = yup.object({
  weight: yup.number().required()
})

const controllersApiMyWeightCreate = async (req, res) => {
  try {
    const { body, session: { user: { id: userId } } } = req
    const verifiedData = await createSchema.validate(body, { abortEarly: false, stripUnknown: true })
    const newWeight = await prisma.weight.create({ data: { ...verifiedData, userId } })
    return res.status(201).json(newWeight)
  } catch (err) {
    return handleErrors(res, err)
  }
}

export default controllersApiMyWeightCreate
