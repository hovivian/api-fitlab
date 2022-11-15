import yup from 'yup'

import prisma from '../../../_helpers/prisma.js'
import handleErrors from '../../../_helpers/handle-errors.js'
import checkOwnership from './_check-ownership.js'

const updateSchema = yup.object({
  exercise: yup.object({
    identifierId: yup.string().required(),
    title: yup.string().required()
  }),
  dayOfWeek: yup.mixed<dayOfWeek>().oneOf(Object.values(dayOfWeek)).required(),
  rep: yup.number(),
  set: yup.number(),
  restDay: yup.boolean().required()
})

const controllersApiMyWorkoutUpdate = async (req, res) => {
  try {
    const { params: { id }, body } = req
    const verifiedData = await updateSchema.validate(body, { abortEarly: false, stripUnknown: true })
    const updateWorkout = await prisma.workout.update({ where: { id: Number(id) }, data: verifiedData })
    return res.status(201).json(updateWorkout)
  } catch (err) {
    return handleErrors(res, err)
  }
}

export default [
  checkOwnership,
  controllersApiMyWorkoutUpdate
]
