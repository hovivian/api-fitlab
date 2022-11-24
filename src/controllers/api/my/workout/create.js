import yup from 'yup'

import prisma from '../../../_helpers/prisma.js'
import handleErrors from '../../../_helpers/handle-errors.js'

const createSchema = yup.object({
  dayOfWeek: yup.string().required(),
  exercise: yup.array().when('restDay', {
    is: true,
    then: (schema) => schema.max(0),
    otherwise: (schema) => schema.of(yup.object({
      name: yup.string().required().label('exercise'),
      rep: yup.number().required().label('rep'),
      set: yup.number().required().label('set')
    }))
  }),
  restDay: yup.boolean().transform((value) => !!value)
})

const controllersApiMyWorkoutCreate = async (req, res) => {
  try {
    const { body, session: { user: { id: userId } } } = req
    const verifiedData = await createSchema.validate(body, { abortEarly: false, stripUnknown: true })
    const newWorkout = await prisma.workout.create({
      data: {
        ...verifiedData,
        userId,
        exercise: verifiedData.restDay ? {} : {
          create: verifiedData.exercise
        }
      },
      include: {
        exercise: true
      }
    })
    return res.status(201).json(newWorkout)
  } catch (err) {
    return handleErrors(res, err)
  }
}

export default controllersApiMyWorkoutCreate
