const Job = require('../models/Job');

const getJobs = async(req, res, next) => {

    const filter = {};
    const options = {};

    if (Object.keys(req.query).length){
        // de-structure
        const { 
            jobTitle, 
            jobDescription, 
            location,
            salary,
            limit,
            sortByjobTitle

        } = req.query

        // assign empty array
        // check if value exists
        if (jobTitle) filter.jobTitle = true;
        if (jobDescription) filter.jobDescription = true;
        if (location) filter.location = true;
        if (salary) filter.salary = true;

        if(limit) options.limit = limit;
        if(sortByjobTitle) options.sort = {
            artist: sortByjobTitle === 'asc' ? 1 : -1
        }
    }

    try {
        const jobs = await Job.find({}, filter, options)

        res
        .status(200)
        .setHeader('Content-Type', 'application/json')
        .json(jobs)
        
    } catch (err) {
        throw new Error(`Error retrieving jobs: ${err.message}`)
    }
}

const postJob = async (req, res, next) => {

    try {
        const job = await Job.create(req.body)

        res
        .status(201)
        .setHeader('Content-Type', 'application/json')
        .json(job)
        
    } catch (err) {
        throw new Error(`Error posting new job: ${err.message}`)
    }
}

const deleteJobs = async (req, res, next) => {

    try {
        await Job.deleteMany();

        res
        .status(200)
        .setHeader('Content-Type', 'application/json')
        .json({ success: true, msg: 'Successfully deleted all jobs!'})

    } catch (err){
        throw new Error(`Error deleting all jobs: ${err.message}`)
    }
}

const getJob = async (req, res, next) => {

    try {

        const job = await Job.findById(req.params.jobId);

        res
        .status(200)
        .setHeader('Content-Type', 'application/json')
        .json(job)


    } catch (err){
        throw new Error(`Error retrieving a job with ID: ${req.params.jobId}: ${err.message}`)
    }
}

const updateJob = async (req, res, next) => {

    try {
        const job = await Job.findByIdAndUpdate(req.params.jobId,
            {$set: req.body}, {new: true});

        res
        .status(200)
        .setHeader('Content-Type', 'application/json')
        .json(job)

    } catch (err) {
        throw new Error(`Error updating job with ID: ${req.params.jobId}: ${err.message}`)
    }
}

const deleteJob = async (req, res, next) => {

    try {
        await Job.findByIdAndDelete(req.params.jobId)

        res
        .status(200)
        .setHeader('Content-Type', 'application/json')
        .json({ success: true, msg: `Job with ID: ${req.params.jobId} was successfully deleted! `})

    } catch (err) {
        throw new Error(`Error deleting job with ID: ${req.params.jobId}: ${err.message}`)
    }
    
}

module.exports = {
    getJobs,
    postJob,
    deleteJobs,
    getJob,
    updateJob,
    deleteJob
}