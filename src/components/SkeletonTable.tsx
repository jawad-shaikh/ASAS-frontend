import React from 'react';

const SkeletonTable: React.FC = () => {
  const renderSkeletonRows = (rowCount: number) => {
    const rows = [];
    for (let i = 0; i < rowCount; i++) {
      rows.push(
        <tr key={i} className="border-b border-gray">
          <td>
            <p className="bg-slate-100 animate-pulse h-6 m-4 rounded-[8px]"></p>
          </td>
          <td>
            <p className="bg-slate-100 animate-pulse h-6 m-4 rounded-[8px]"></p>
          </td>
          <td>
            <p className="bg-slate-100 animate-pulse h-6 m-4 rounded-[8px]"></p>
          </td>
          <td>
            <p className="bg-slate-100 animate-pulse h-6 m-4 rounded-[8px]"></p>
          </td>
          <td>
            <p className="bg-slate-100 animate-pulse h-6 m-4 rounded-[8px]"></p>
          </td>
          <td>
            <p className="bg-slate-100 animate-pulse h-6 m-4 rounded-[8px]"></p>
          </td>
          <td>
            <p className="bg-slate-100 animate-pulse h-6 m-4 rounded-[8px]"></p>
          </td>
          <td>
            <p className="bg-slate-100 animate-pulse h-6 m-4 rounded-[8px]"></p>
          </td>
        </tr>
      );
    }
    return rows;
  };

  return (
    <table className="w-full overflow-auto bg-white border border-gray">
      <thead>
        <tr className="text-sm font-semibold bg-primary p-4">
          {[...Array(8)].map((_, index) => (
            <th key={index}>
              <p className="bg-white/10 animate-pulse h-6 m-4 rounded-[8px] min-w-20"></p>
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {renderSkeletonRows(10)}
      </tbody>
    </table>
  );
};

export default SkeletonTable;