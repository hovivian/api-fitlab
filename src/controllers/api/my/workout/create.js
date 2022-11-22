import yup from 'yup'

import prisma from '../../../_helpers/prisma.js'
import handleErrors from '../../../_helpers/handle-errors.js'

const createSchema = yup.object({
  exercise: yup.string.required(),
  dayOfWeek: yup.string().required(),
  rep: yup.number(),
  set: yup.number(),
  restDay: yup.boolean().required()
})

const controllersApiMyWorkoutCreate = async (req, res) => {
  try {
    const { body, session: { user: { id: userId } } } = req

    const verifiedData = await createSchema.validate(body, { abortEarly: false, stripUnknown: true })
    const newWorkout = await prisma.workout.create({ data: { ...verifiedData, userId } })
    return res.status(201).json(newWorkout)
  } catch (err) {
    return handleErrors(res, err)
  }
}

export default controllersApiMyWorkoutCreate
