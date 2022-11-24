import yup from 'yup'

import prisma from '../../../_helpers/prisma.js'
import handleErrors from '../../../_helpers/handle-errors.js'
import checkOwnership from './_check-ownership.js'

const updateSchema = yup.object({
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

const controllersApiMyWorkoutUpdate = async (req, res) => {
  try {
    const { params: { id }, body } = req
    const verifiedData = await updateSchema.validate(body, { abortEarly: false, stripUnknown: true })
    const updatedWorkout = await prisma.workout.update({ where: { id: Number(id) }, data: verifiedData })
    return res.status(201).json(updatedWorkout)
  } catch (err) {
    return handleErrors(res, err)
  }
}

export default [
  checkOwnership,
  controllersApiMyWorkoutUpdate
]
