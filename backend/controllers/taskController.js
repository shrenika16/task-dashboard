let tasks = [
{title:"Learn React",status:"Pending"},
{title:"Build Dashboard",status:"Completed"}
];

exports.getTasks = (req,res)=>{
res.json(tasks);
};

exports.addTask = (req,res)=>{

const task = req.body;

tasks.push(task);

res.json({
message:"Task added",
task
});

};