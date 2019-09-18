interface Person {
    firstName: string;
    lastName: string;
}

export default function handle(req:any, res:any) {
  const params:Person = req.query;
  res.send(params)
}
