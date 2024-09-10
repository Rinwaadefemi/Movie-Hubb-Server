//UTILS ARE USED TO DO YOUR CODE ONCE AND CAN BE USED EVERYWHERE. THE CODE CAN BE SPREAD ACROSS DIFFERENT FILES AND FOLDERS

const methodNotAllowed = (req, res) => {
  console.log(req);
  res.status(405).json({
    message: `Method ${req.method} not Allowed on ${req.originalUrl}`,
  });
};

module.exports = methodNotAllowed;
