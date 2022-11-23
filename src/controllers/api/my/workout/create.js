import yup from 'yup'

import prisma from '../../../_helpers/prisma.js'
import handleErrors from '../../../_helpers/handle-errors.js'

const createSchema = yup.object({
  dayOfWeek: yup.string().required(),
  restDay: yup.boolean().required(),
  Exercise: yup.array().of(yup.object({
    name: yup.string().required(),
    rep: yup.number().required(),
    set: yup.number().required()
  }))
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
