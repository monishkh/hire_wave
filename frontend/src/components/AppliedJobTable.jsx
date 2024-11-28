import React from 'react'
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from './ui/table'
import { Badge } from './ui/badge'
import { useSelector } from 'react-redux';

function AppliedJobTable() {
  const { allAppliedJobs } = useSelector(state => state.job)

  return (
    <>
      <Table>
        <TableCaption>A list of your applied jobs</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Date</TableHead>
            <TableHead>Job Role</TableHead>
            <TableHead>Company</TableHead>
            <TableHead className="text-right">Status</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {
            allAppliedJobs?.map((appliedJob) => (
              <TableRow key={appliedJob?._id}>
                <TableCell>{appliedJob?.createdAt?.split("T")[0]}</TableCell>
                <TableCell>{appliedJob?.job?.title}</TableCell>
                <TableCell>{appliedJob?.job?.company?.name}</TableCell>
                <TableCell className="text-right" >
                  <Badge variant="outline"
                    className={`${appliedJob?.status === "Accepted"
                      ? "bg-green-500"
                      : appliedJob?.status === "Pending"
                        ? "bg-gray-500"
                        : "bg-red-500"
                      } text-white py-2 rounded text-md  transition-transform transform duration-300 ease-in-out hover:scale-105`}

                  >
                    {appliedJob?.status}
                  </Badge>
                </TableCell>
              </TableRow>
            ))
          }
        </TableBody>
      </Table>
    </>
  )
}

export default AppliedJobTable