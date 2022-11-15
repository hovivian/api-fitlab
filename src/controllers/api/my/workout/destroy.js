import prisma from '../../../_helpers/prisma.js'
import handleErrors from '../../../_helpers/handle-errors.js'
import checkOwnership from './_check-ownership.js'

const controllersApiMyWorkoutDestroy = async (req, res) => {
  try {
    const { params: { id } } = req
    const deletedWorkout = await prisma.workout.delete({ where: { id: Number(id) } })
    return res.status(200).json(deletedWorkout)
  } catch (err) {
    return handleErrors(res, err)
  }
}

export default [
  checkOwnership,
  controllersApiMyWorkoutDestroy
]
