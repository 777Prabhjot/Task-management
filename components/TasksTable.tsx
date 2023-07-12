import React from "react";

const TasksTable = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="md:px-32 py-8 w-full">
      <div className="shadow overflow-hidden rounded border-b border-gray-200">
        <table className="min-w-full bg-white">
          <thead className="bg-gray-800 text-white">
            <tr>
              <th className="w-1/3 text-left py-3 px-4 uppercase font-semibold text-sm">
                Title
              </th>
              <th className="w-1/3 text-left py-3 px-4 uppercase font-semibold text-sm">
                Description
              </th>
              <th className="text-left py-3 px-4 uppercase font-semibold text-sm">
                Status
              </th>
              <th className="text-left py-3 px-4 uppercase font-semibold text-sm"></th>
            </tr>
          </thead>
          <tbody className="text-gray-700">{children}</tbody>
        </table>
      </div>
    </div>
  );
};

export default TasksTable;
