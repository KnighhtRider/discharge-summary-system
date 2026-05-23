"use client";

import React, { useState } from 'react';
import { Search, Printer, ArrowLeft, Calendar, FileText, Activity, Users, ChevronDown } from 'lucide-react';

// --- Mock Data ---
interface ReportData {
  id: number;
  uhid: string;
  name: string;
  ipNo: string;
  dept: string;
  unit: string;
  doctor: string;
  admitDate: string;
  dischargeDate: string;
  guardian: string;
  ward: string;
  ageSex: string;
  diagnosis: string;
  complaints: string;
}

const mockReports: ReportData[] = Array.from({ length: 15 }).map((_, i) => ({
  id: i + 1,
  uhid: `UD-26010${60001 + i}`,
  name: [
    'Mr Dharam Pal Singh', 'Mr Siddhant Singh', 'Mr Suraj Roy', 'Mrs Anjali Sharma', 'Mr Rajesh Kumar',
    'Ms Priya Patel', 'Mr Amit Verma', 'Mrs Sunita Devi', 'Mr Vikram Malhotra', 'Ms Neha Gupta',
    'Mr Rahul Desai', 'Mrs Kirti Jain', 'Mr Sameer Khan', 'Ms Riya Sen', 'Mr Anil Kapoor'
  ][i],
  ipNo: `IP-26031${10001 + i}`,
  dept: ['Neurology', 'General Medicine', 'Cardiology', 'Orthopedics', 'Pediatrics'][i % 5],
  unit: ['MIMHANS', 'MIMHANS UNIT', 'CARDIO-1', 'ORTHO-A', 'PEDS-2'][i % 5],
  doctor: [
    'DR. ARUN SHARMA', 'Dr. Joy Singh', 'Dr. S. Digendra', 'Dr. Meera Menon', 'Dr. R. K. Gupta'
  ][i % 5],
  admitDate: `2026-03-${String(11 + (i % 15)).padStart(2, '0')} 10:00:00`,
  dischargeDate: `${String(12 + (i % 15)).padStart(2, '0')} Mar 2026 12:00 PM`,
  guardian: [
    'Mrs. Dharam Pal Singh', 'Mrs. Rekha Singh', 'Mr. Amit Roy', 'Mr. Suresh Sharma', 'Mrs. Aarti Kumar',
    'Mr. Ravi Patel', 'Mrs. Seema Verma', 'Mr. Ramesh Devi', 'Mrs. Pooja Malhotra', 'Mr. Vikas Gupta',
    'Mrs. Anjali Desai', 'Mr. Rahul Jain', 'Mrs. Sana Khan', 'Mr. Rohan Sen', 'Mrs. Sunita Kapoor'
  ][i],
  ward: ['Super Delux', 'General', 'Private', 'Semi-Private', 'ICU'][i % 5],
  ageSex: `${30 + i}y / ${i % 2 === 0 ? 'M' : 'F'}`,
  diagnosis: ['Ischemic Stroke', 'Viral Pyrexia', 'Acute Gastroenteritis', 'Fracture Radius', 'Bronchiolitis'][i % 5],
  complaints: 'Clinical Findings indicate typical presentation of symptoms. Patient responded to first line of management.',
}));

interface DeathData {
  id: number;
  department: string;
  male: number;
  female: number;
  total: number;
}

const mockDeathData: DeathData[] = [
  { id: 1, department: 'General Medicine', male: 1, female: 3, total: 4 },
  { id: 2, department: 'General Surgery', male: 2, female: 0, total: 2 },
  { id: 3, department: 'Neurology', male: 1, female: 1, total: 2 },
  { id: 4, department: 'Cardiology', male: 3, female: 2, total: 5 },
];

interface AppointmentData {
  id: number;
  sNo: number;
  doctor: string;
  uhid: string;
  name: string;
  age: string;
  category: string;
  time: string;
  type: string;
  paymentStatus: 'Paid' | 'UnPaid';
  status: 'Confirmed' | 'Unconfirmed';
}

const mockAppointments: AppointmentData[] = Array.from({ length: 15 }).map((_, i) => {
  const isConfirmed = i % 3 !== 0; // 2/3 confirmed
  return {
    id: i + 1,
    sNo: i + 1,
    doctor: ['Dr. Arun Sharma', 'Dr. Joy Singh', 'Dr. Meera Menon'][i % 3],
    uhid: `UD-26010${80001 + i}`,
    name: ['Mr Rahul Desai', 'Mrs Kirti Jain', 'Mr Sameer Khan', 'Ms Riya Sen', 'Mr Anil Kapoor'][i % 5],
    age: `${25 + i}y`,
    category: i % 2 === 0 ? 'General' : 'Private',
    time: `10:${String((i * 15) % 60).padStart(2, '0')} AM`,
    type: i % 4 === 0 ? 'Follow-up' : 'New',
    paymentStatus: isConfirmed ? 'Paid' : 'UnPaid',
    status: isConfirmed ? 'Confirmed' : 'Unconfirmed',
  };
});

interface UserCollectionData {
  id: number;
  sNo: number;
  opDate: string;
  uhid: string;
  opNo: string;
  patientName: string;
  city: string;
  age: string;
  sex: string;
  consultant: string;
  emplName: string;
  paymentMode: string;
  amount: number;
  cancelAmount: number;
}

const mockUserCollections: UserCollectionData[] = Array.from({ length: 12 }).map((_, i) => ({
  id: i + 1,
  sNo: i + 1,
  opDate: `22-05-2026 ${String(10 + i).padStart(2, '0')}:30`,
  uhid: `UD-26010${80001 + i}`,
  opNo: `OP-26010${80001 + i}`,
  patientName: ['Mr Dharam Pal Singh', 'Ms Priya Patel', 'Mr Amit Verma', 'Mrs Sunita Devi', 'Mr Vikram Malhotra'][i % 5],
  city: ['Metropolis', 'Gotham', 'Star City', 'Central City', 'Coast City'][i % 5],
  age: `${30 + i}`,
  sex: i % 2 === 0 ? 'M' : 'F',
  consultant: ['DR. ARUN SHARMA', 'Dr. Joy Singh', 'Dr. S. Digendra', 'Dr. Meera Menon'][i % 4],
  emplName: ['Admin User', 'Staff One', 'Front Desk', 'Billing Exec'][i % 4],
  paymentMode: ['Cash', 'Card', 'UPI', 'Insurance'][i % 4],
  amount: 500 + i * 100,
  cancelAmount: i % 5 === 0 ? (i===0? 0 : 500) : 0,
}));

interface CancelReceiptsData {
  id: number;
  paymentType: string;
  opCollection: number;
  opConsultCancel: number;
  serBalanceAmount: number;
  serBalanceCancelled: number;
  prevBalanceRec: number;
  refundAmount: number;
  ipCollection: number;
  ipAdvCancel: number;
  serviceAmt: number;
  serviceCancel: number;
  totalCollection: number;
}

const mockCancelReceipts: CancelReceiptsData[] = [
  {
    id: 1,
    paymentType: 'Cash',
    opCollection: 0.00,
    opConsultCancel: 500.00,
    serBalanceAmount: 0.00,
    serBalanceCancelled: 0.00,
    prevBalanceRec: 0.00,
    refundAmount: 500.00,
    ipCollection: 0.00,
    ipAdvCancel: 0.00,
    serviceAmt: 0.00,
    serviceCancel: 0.00,
    totalCollection: 500.00,
  },
  {
    id: 2,
    paymentType: 'Card',
    opCollection: 0.00,
    opConsultCancel: 0.00,
    serBalanceAmount: 0.00,
    serBalanceCancelled: 150.00,
    prevBalanceRec: 0.00,
    refundAmount: 150.00,
    ipCollection: 0.00,
    ipAdvCancel: 0.00,
    serviceAmt: 0.00,
    serviceCancel: 0.00,
    totalCollection: 150.00,
  }
];

// --- Print Components ---
const PrintDocument = ({ data, onClose }: { data: ReportData; onClose: () => void }) => {
  return (
    <div className="min-h-screen bg-slate-100 p-4 md:p-8 font-sans">
      <div className="max-w-5xl mx-auto mb-4 flex justify-between items-center bg-white p-4 rounded-lg shadow-sm border border-slate-200 print:hidden">
        <button
          onClick={onClose}
          className="flex items-center text-slate-600 hover:text-slate-900 transition-colors px-3 py-2 rounded-md hover:bg-slate-100"
        >
          <ArrowLeft className="w-5 h-5 mr-2" />
          Back to List
        </button>
        <button
          onClick={() => window.print()}
          className="flex items-center bg-teal-700 hover:bg-teal-800 text-white px-5 py-2 rounded-md font-medium transition-colors shadow-sm"
        >
          <Printer className="w-5 h-5 mr-2" />
          Print Document
        </button>
      </div>

      <div className="max-w-5xl mx-auto bg-white p-10 md:p-16 shadow-xl border border-slate-300 print:shadow-none print:border-none print:p-0 print:max-w-none w-full">
        <div className="text-center pb-6 border-b-2 border-slate-800 mb-8">
          <div className="flex items-center justify-between mb-4">
            <div className="w-24 h-24 rounded-full border-2 border-teal-700 flex items-center justify-center bg-slate-50 text-teal-700">
               <Activity className="w-12 h-12" />
            </div>
            <div className="flex-1">
              <h1 className="text-2xl font-bold text-slate-900 uppercase tracking-wide">City Neurosciences Hospital</h1>
              <p className="text-sm text-slate-600 mt-1">123 Health Avenue, Sector 5, Medical District, Metropolis - 110011</p>
            </div>
            <div className="w-24 px-2 text-right text-xs text-slate-500">
              Form: DS-01
            </div>
          </div>
          
          <div className="inline-block border-2 border-slate-800 rounded px-12 py-2 bg-slate-50 mt-4">
            <h2 className="text-xl font-bold text-slate-900 uppercase tracking-widest">Discharge Summary</h2>
          </div>
        </div>

        {/* Form fields identical to previously set up print page ... */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-y-4 gap-x-8 text-sm mb-10 pb-6 border-b border-slate-200">
          <div className="space-y-3">
            <div className="grid grid-cols-3 gap-2"><span className="font-semibold text-slate-700 col-span-1">UHID:</span> <span className="col-span-2 text-slate-900">{data.uhid}</span></div>
            <div className="grid grid-cols-3 gap-2"><span className="font-semibold text-slate-700 col-span-1">Patient Name:</span> <span className="col-span-2 text-slate-900">{data.name}</span></div>
            <div className="grid grid-cols-3 gap-2"><span className="font-semibold text-slate-700 col-span-1">Address:</span> <span className="col-span-2 text-slate-900">123 Local Street, City</span></div>
            <div className="grid grid-cols-3 gap-2"><span className="font-semibold text-slate-700 col-span-1">Dept. / Unit:</span> <span className="col-span-2 text-slate-900">{data.dept} / {data.unit}</span></div>
          </div>
          <div className="space-y-3">
            <div className="grid grid-cols-3 gap-2"><span className="font-semibold text-slate-700 col-span-1">IP No.:</span> <span className="col-span-2 text-slate-900">{data.ipNo}</span></div>
            <div className="grid grid-cols-3 gap-2"><span className="font-semibold text-slate-700 col-span-1">Guardian:</span> <span className="col-span-2 text-slate-900">{data.guardian}</span></div>
            <div className="grid grid-cols-3 gap-2"><span className="font-semibold text-slate-700 col-span-1">Doctor:</span> <span className="col-span-2 text-slate-900">{data.doctor}</span></div>
            <div className="grid grid-cols-3 gap-2"><span className="font-semibold text-slate-700 col-span-1">Patient No.:</span> <span className="col-span-2 text-slate-900">{data.ipNo}</span></div>
          </div>
          <div className="space-y-3">
            <div className="grid grid-cols-3 gap-2"><span className="font-semibold text-slate-700 col-span-1 md:text-right pr-2">Admit Date:</span> <span className="col-span-2 text-slate-900">{data.admitDate}</span></div>
            <div className="grid grid-cols-3 gap-2"><span className="font-semibold text-slate-700 col-span-1 md:text-right pr-2">Discharge:</span> <span className="col-span-2 text-slate-900">Normal</span></div>
            <div className="grid grid-cols-3 gap-2"><span className="font-semibold text-slate-700 col-span-1 md:text-right pr-2">D.O.D:</span> <span className="col-span-2 text-slate-900">{data.dischargeDate}</span></div>
            <div className="grid grid-cols-3 gap-2"><span className="font-semibold text-slate-700 col-span-1 md:text-right pr-2">Age / Sex:</span> <span className="col-span-2 text-slate-900">{data.ageSex}</span></div>
          </div>
        </div>

        <div className="mb-8">
          <h3 className="font-bold text-slate-800 uppercase border-b-2 border-slate-400 inline-block mb-4 pb-1">Diagnosis</h3>
          <table className="w-full text-sm border-collapse border border-slate-400">
            <thead className="bg-slate-100 text-slate-800 text-left">
              <tr>
                <th className="border border-slate-400 p-2 w-16 text-center">S.No.</th>
                <th className="border border-slate-400 p-2">Diagnosis (with ICD-10 Code)</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border border-slate-400 p-2 text-center text-slate-900">1.</td>
                <td className="border border-slate-400 p-2 text-slate-900 font-medium">{data.diagnosis}</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="space-y-8 text-sm">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="font-bold text-slate-800 col-span-1">Chief Complaints:</div>
            <div className="col-span-3 text-slate-900">{data.complaints}</div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="font-bold text-slate-800 col-span-1">Course in Hospital:</div>
            <div className="col-span-3 text-slate-900">
              Patient was admitted under the Department of {data.dept}. Managed conservatively. Tolerating oral diet well. Hemodynamically stable at the time of discharge.
            </div>
          </div>
        </div>

        <div className="mt-32 pt-8 flex justify-between px-4 md:px-10 print:break-inside-avoid">
           <div className="text-center">
              <div className="w-48 border-b border-slate-400 mb-2"></div>
              <p className="text-sm font-bold text-slate-800">Patient / Relatives Signature</p>
           </div>
           <div className="text-center">
              <div className="w-48 border-b border-slate-400 mb-2"></div>
              <p className="text-sm font-bold text-slate-800">Consultant / RMO Signature</p>
           </div>
        </div>
      </div>
    </div>
  );
};

const PrintDeathStatsDocument = ({ onClose }: { onClose: () => void }) => {
  const totalMale = mockDeathData.reduce((acc, curr) => acc + curr.male, 0);
  const totalFemale = mockDeathData.reduce((acc, curr) => acc + curr.female, 0);
  const grandTotal = totalMale + totalFemale;
  const deathDepartmentCount = mockDeathData.length;

  return (
    <div className="min-h-screen bg-slate-100 p-4 md:p-8 font-sans">
      <div className="max-w-4xl mx-auto mb-4 flex justify-between items-center bg-white p-4 rounded-lg shadow-sm border border-slate-200 print:hidden">
        <button onClick={onClose} className="flex items-center text-slate-600 hover:text-slate-900 transition-colors px-3 py-2 rounded-md hover:bg-slate-100">
          <ArrowLeft className="w-5 h-5 mr-2" />
          Back to List
        </button>
        <button onClick={() => window.print()} className="flex items-center bg-teal-700 hover:bg-teal-800 text-white px-5 py-2 rounded-md font-medium transition-colors shadow-sm">
          <Printer className="w-5 h-5 mr-2" />
          Print Document
        </button>
      </div>

      <div className="max-w-4xl mx-auto bg-white p-10 md:p-16 shadow-xl border border-slate-300 print:shadow-none print:border-none print:p-0 print:max-w-none w-full">
        <div className="text-center pb-6 border-b-2 border-slate-800 mb-8">
          <h1 className="text-2xl font-bold text-slate-900 uppercase tracking-wide">City Neurosciences Hospital</h1>
          <p className="text-sm text-slate-600 mt-1">123 Health Avenue, Sector 5, Medical District, Metropolis - 110011</p>
          <div className="inline-block border-2 border-slate-800 rounded px-12 py-2 bg-slate-50 mt-6">
            <h2 className="text-xl font-bold text-slate-900 uppercase tracking-widest">Death Statistics Report</h2>
          </div>
        </div>

        <div className="mb-6 flex justify-between text-sm font-semibold text-slate-800">
          <span>Period: 01-05-2024 to 22-05-2026</span>
          <span>Generated On: 22-05-2026</span>
        </div>

        <table className="w-full text-sm border-collapse border border-slate-400">
          <thead className="bg-[#0159a6] text-white text-left border-b-2 border-slate-400">
            <tr>
              <th className="border border-slate-400 p-3 w-16 text-center">S.No.</th>
              <th className="border border-slate-400 p-3">Department</th>
              <th className="border border-slate-400 p-3 text-center">Male</th>
              <th className="border border-slate-400 p-3 text-center">Female</th>
              <th className="border border-slate-400 p-3 text-center font-bold">Total</th>
            </tr>
          </thead>
          <tbody>
            {mockDeathData.map((data, index) => (
              <tr key={data.id}>
                <td className="border border-slate-400 p-3 text-center text-slate-900">{index + 1}</td>
                <td className="border border-slate-400 p-3 text-slate-900">{data.department}</td>
                <td className="border border-slate-400 p-3 text-center text-slate-900">{data.male}</td>
                <td className="border border-slate-400 p-3 text-center text-slate-900">{data.female}</td>
                <td className="border border-slate-400 p-3 text-center text-slate-900 font-bold">{data.total}</td>
              </tr>
            ))}
          </tbody>
          <tfoot className="bg-slate-100 font-bold text-slate-900">
            <tr>
              <td colSpan={2} className="border border-slate-400 p-3 text-center text-slate-900 uppercase">Total</td>
              <td className="border border-slate-400 p-3 text-center text-slate-900">{totalMale}</td>
              <td className="border border-slate-400 p-3 text-center text-slate-900">{totalFemale}</td>
              <td className="border border-slate-400 p-3 text-center text-slate-900 font-bold">{grandTotal}</td>
            </tr>
          </tfoot>
        </table>

        <div className="mt-24 pt-8 flex justify-end px-4 print:break-inside-avoid">
           <div className="text-center">
              <div className="w-48 border-b border-slate-400 mb-2"></div>
              <p className="text-sm font-bold text-slate-800">Authorized Signatory</p>
           </div>
        </div>
      </div>
    </div>
  );
};

const PrintUserCollectionDocument = ({ onClose }: { onClose: () => void }) => {
  const totalAmount = mockUserCollections.reduce((acc, curr) => acc + curr.amount, 0);
  const totalCancelAmount = mockUserCollections.reduce((acc, curr) => acc + curr.cancelAmount, 0);

  return (
    <div className="min-h-screen bg-slate-100 p-4 md:p-8 font-sans">
      <div className="max-w-6xl mx-auto mb-4 flex justify-between items-center bg-white p-4 rounded-lg shadow-sm border border-slate-200 print:hidden">
        <button onClick={onClose} className="flex items-center text-slate-600 hover:text-slate-900 transition-colors px-3 py-2 rounded-md hover:bg-slate-100">
          <ArrowLeft className="w-5 h-5 mr-2" />
          Back to List
        </button>
        <button onClick={() => window.print()} className="flex items-center bg-teal-700 hover:bg-teal-800 text-white px-5 py-2 rounded-md font-medium transition-colors shadow-sm">
          <Printer className="w-5 h-5 mr-2" />
          Print Document
        </button>
      </div>

      <div className="max-w-6xl mx-auto bg-white p-10 md:p-12 shadow-xl border border-slate-300 print:shadow-none print:border-none print:p-0 print:max-w-none w-full">
        <div className="text-center pb-6 border-b-2 border-slate-800 mb-6">
          <h1 className="text-2xl font-bold text-slate-900 uppercase tracking-wide">City Neurosciences Hospital</h1>
          <p className="text-sm text-slate-600 mt-1">123 Health Avenue, Sector 5, Medical District, Metropolis - 110011</p>
          <div className="inline-block border-2 border-slate-800 rounded px-12 py-2 bg-slate-50 mt-6">
            <h2 className="text-xl font-bold text-slate-900 uppercase tracking-widest">User Collection Report</h2>
          </div>
        </div>

        <div className="overflow-x-auto mb-8">
          <table className="w-full text-xs box-border border-collapse border border-slate-400">
            <thead className="bg-[#0159a6] text-white text-left border-b-2 border-slate-400">
              <tr>
                <th className="border border-slate-400 p-1.5 text-center whitespace-nowrap">S.No.</th>
                <th className="border border-slate-400 p-1.5 whitespace-nowrap">Date</th>
                <th className="border border-slate-400 p-1.5 whitespace-nowrap">UHID</th>
                <th className="border border-slate-400 p-1.5 whitespace-nowrap">OP No.</th>
                <th className="border border-slate-400 p-1.5 whitespace-nowrap">Patient</th>
                <th className="border border-slate-400 p-1.5 whitespace-nowrap">City</th>
                <th className="border border-slate-400 p-1.5 text-center whitespace-nowrap">Age/Sex</th>
                <th className="border border-slate-400 p-1.5 whitespace-nowrap">Doctor</th>
                <th className="border border-slate-400 p-1.5 whitespace-nowrap">Staff</th>
                <th className="border border-slate-400 p-1.5 whitespace-nowrap">Mode</th>
                <th className="border border-slate-400 p-1.5 text-right whitespace-nowrap">Amt</th>
                <th className="border border-slate-400 p-1.5 text-right whitespace-nowrap">Cncl Amt</th>
              </tr>
            </thead>
            <tbody>
              {mockUserCollections.map((data, index) => (
                <tr key={data.id}>
                  <td className="border border-slate-400 p-1.5 text-center text-slate-900">{index + 1}</td>
                  <td className="border border-slate-400 p-1.5 text-slate-900 whitespace-nowrap">{data.opDate.split(' ')[0]}</td>
                  <td className="border border-slate-400 p-1.5 text-slate-900 whitespace-nowrap">{data.uhid}</td>
                  <td className="border border-slate-400 p-1.5 text-slate-900 whitespace-nowrap">{data.opNo}</td>
                  <td className="border border-slate-400 p-1.5 text-slate-900 whitespace-nowrap font-medium truncate max-w-[120px]" title={data.patientName}>{data.patientName}</td>
                  <td className="border border-slate-400 p-1.5 text-slate-900 whitespace-nowrap truncate max-w-[80px]" title={data.city}>{data.city}</td>
                  <td className="border border-slate-400 p-1.5 text-center text-slate-900">{data.age}/{data.sex}</td>
                  <td className="border border-slate-400 p-1.5 text-slate-900 whitespace-nowrap truncate max-w-[100px]" title={data.consultant}>{data.consultant.replace(/dr\.?\s*/i, '')}</td>
                  <td className="border border-slate-400 p-1.5 text-slate-900 whitespace-nowrap truncate max-w-[80px]" title={data.emplName}>{data.emplName}</td>
                  <td className="border border-slate-400 p-1.5 text-slate-900 whitespace-nowrap">{data.paymentMode}</td>
                  <td className="border border-slate-400 p-1.5 text-right text-slate-900 font-medium">{data.amount.toFixed(2)}</td>
                  <td className="border border-slate-400 p-1.5 text-right text-slate-900">{data.cancelAmount > 0 ? data.cancelAmount.toFixed(2) : '-'}</td>
                </tr>
              ))}
            </tbody>
            <tfoot className="bg-slate-100 font-bold text-slate-900 text-sm border-t-2 border-slate-400">
              <tr>
                <td colSpan={10} className="border border-slate-400 p-3 text-right uppercase tracking-wider">Total:</td>
                <td className="border border-slate-400 p-3 text-right whitespace-nowrap">₹{totalAmount.toFixed(2)}</td>
                <td className="border border-slate-400 p-3 text-right whitespace-nowrap text-rose-600">₹{totalCancelAmount.toFixed(2)}</td>
              </tr>
            </tfoot>
          </table>
        </div>

        <div className="mb-2">
            <h3 className="text-lg font-bold text-slate-800 mb-2">Cancel Receipts</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-xs border-collapse border border-slate-400 mb-10">
            <thead className="bg-[#fff4f4] text-rose-800 text-left border-y-2 border-slate-400 text-[11px]">
              <tr>
                <th className="border border-slate-400 p-1.5 font-semibold">Pay Type</th>
                <th className="border border-slate-400 p-1.5 text-right font-semibold">OP Coll(₹)</th>
                <th className="border border-slate-400 p-1.5 text-right font-semibold">OP Cncl(₹)</th>
                <th className="border border-slate-400 p-1.5 text-right font-semibold">Ser Bal(₹)</th>
                <th className="border border-slate-400 p-1.5 text-right font-semibold">Ser Bal Cncl(₹)</th>
                <th className="border border-slate-400 p-1.5 text-right font-semibold">Prev Bal(₹)</th>
                <th className="border border-slate-400 p-1.5 text-right font-semibold">Refund(₹)</th>
                <th className="border border-slate-400 p-1.5 text-right font-semibold">IP Coll(₹)</th>
                <th className="border border-slate-400 p-1.5 text-right font-semibold">IP Adv Cncl(₹)</th>
                <th className="border border-slate-400 p-1.5 text-right font-semibold">Ser Amt(₹)</th>
                <th className="border border-slate-400 p-1.5 text-right font-semibold">Ser Cncl(₹)</th>
                <th className="border border-slate-400 p-1.5 text-right bg-rose-100 font-bold whitespace-nowrap">Total(₹)</th>
              </tr>
            </thead>
            <tbody>
              {mockCancelReceipts.length === 0 ? (
                <tr>
                  <td colSpan={12} className="border border-slate-400 p-3 text-center text-slate-800 font-bold text-sm">
                    No Records Found!
                  </td>
                </tr>
              ) : (
                mockCancelReceipts.map(cr => (
                   <tr key={cr.id}>
                     <td className="border border-slate-400 p-1.5 text-rose-900">{cr.paymentType}</td>
                     <td className="border border-slate-400 p-1.5 text-right">{cr.opCollection.toFixed(2)}</td>
                     <td className="border border-slate-400 p-1.5 text-right">{cr.opConsultCancel.toFixed(2)}</td>
                     <td className="border border-slate-400 p-1.5 text-right">{cr.serBalanceAmount.toFixed(2)}</td>
                     <td className="border border-slate-400 p-1.5 text-right">{cr.serBalanceCancelled.toFixed(2)}</td>
                     <td className="border border-slate-400 p-1.5 text-right">{cr.prevBalanceRec.toFixed(2)}</td>
                     <td className="border border-slate-400 p-1.5 text-right">{cr.refundAmount.toFixed(2)}</td>
                     <td className="border border-slate-400 p-1.5 text-right">{cr.ipCollection.toFixed(2)}</td>
                     <td className="border border-slate-400 p-1.5 text-right">{cr.ipAdvCancel.toFixed(2)}</td>
                     <td className="border border-slate-400 p-1.5 text-right">{cr.serviceAmt.toFixed(2)}</td>
                     <td className="border border-slate-400 p-1.5 text-right">{cr.serviceCancel.toFixed(2)}</td>
                     <td className="border border-slate-400 p-1.5 text-right bg-rose-50 font-bold">{cr.totalCollection.toFixed(2)}</td>
                   </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        <div className="mt-16 pt-8 flex justify-end px-4 print:break-inside-avoid">
           <div className="text-center">
              <div className="w-48 border-b border-slate-400 mb-2"></div>
              <p className="text-sm font-bold text-slate-800">Authorized Signatory</p>
           </div>
        </div>
      </div>
    </div>
  );
};

// --- Main App Component (List View) ---
export default function Page() {
  const [activeTab, setActiveTab] = useState<'discharge' | 'death' | 'appointment' | 'user-collection'>('discharge');
  const [selectedReport, setSelectedReport] = useState<ReportData | null>(null);
  const [isPrintingDeathStats, setIsPrintingDeathStats] = useState(false);
  const [isPrintingUserCollection, setIsPrintingUserCollection] = useState(false);

  if (selectedReport) return <PrintDocument data={selectedReport} onClose={() => setSelectedReport(null)} />;
  if (isPrintingDeathStats) return <PrintDeathStatsDocument onClose={() => setIsPrintingDeathStats(false)} />;
  if (isPrintingUserCollection) return <PrintUserCollectionDocument onClose={() => setIsPrintingUserCollection(false)} />;

  const totalMale = mockDeathData.reduce((acc, curr) => acc + curr.male, 0);
  const totalFemale = mockDeathData.reduce((acc, curr) => acc + curr.female, 0);
  const grandTotal = totalMale + totalFemale;
  const deathDepartmentCount = mockDeathData.length;

  return (
    <div className="min-h-screen bg-slate-50 font-sans print:hidden">
      
      {/* Top Navigation / App Header */}
      <header className="bg-white border-b border-slate-200 px-6 py-4 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center space-x-3">
          <div className="bg-teal-700 p-2 rounded-lg text-white shadow-sm">
            <Activity className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-slate-800 leading-tight">Hospital Information System</h1>
            <p className="text-xs text-slate-500 font-medium uppercase tracking-wider mt-0.5">Records & Reports</p>
          </div>
        </div>

        <div className="flex bg-slate-100 p-1 rounded-lg border border-slate-200 w-full md:w-auto">
          <button 
            onClick={() => setActiveTab('discharge')}
            className={`flex-1 md:flex-none px-4 py-2 rounded-md text-sm font-semibold transition-all ${activeTab === 'discharge' ? 'bg-white text-teal-700 shadow-sm border border-slate-200' : 'text-slate-600 hover:text-slate-900'}`}
          >
            Discharge Summaries
          </button>
          <button 
            onClick={() => setActiveTab('death')}
            className={`flex-1 md:flex-none px-4 py-2 rounded-md text-sm font-semibold transition-all ${activeTab === 'death' ? 'bg-white text-teal-700 shadow-sm border border-slate-200' : 'text-slate-600 hover:text-slate-900'}`}
          >
            Death Statistics
          </button>
          <button 
            onClick={() => setActiveTab('appointment')}
            className={`flex-1 md:flex-none px-4 py-2 rounded-md text-sm font-semibold transition-all ${activeTab === 'appointment' ? 'bg-white text-teal-700 shadow-sm border border-slate-200' : 'text-slate-600 hover:text-slate-900'}`}
          >
            Appointments
          </button>
          <button 
            onClick={() => setActiveTab('user-collection')}
            className={`flex-1 md:flex-none px-4 py-2 rounded-md text-sm font-semibold transition-all ${activeTab === 'user-collection' ? 'bg-white text-teal-700 shadow-sm border border-slate-200' : 'text-slate-600 hover:text-slate-900'}`}
          >
            User Collection
          </button>
        </div>
      </header>

      <main className="max-w-7xl mx-auto p-4 md:p-6 lg:p-8 space-y-6">
        
        {/* COMMON FILTER SECTION */}
        <section className="bg-white rounded-xl shadow-sm border border-slate-200 p-5">
          <div className="flex flex-col lg:flex-row lg:items-end gap-5">
            
            <div className="flex-1 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
              <div className="space-y-1.5 flex flex-col">
                <label className="text-sm font-semibold text-slate-700">
                  {activeTab === 'appointment' ? 'Appointment Date' : 'From Date'}
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Calendar className="h-4 w-4 text-slate-400" />
                  </div>
                  <input 
                    type="date" 
                    defaultValue={activeTab === 'appointment' ? "2026-05-22" : "2024-05-01"}
                    className="block w-full pl-10 pr-3 py-2 border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-teal-600 focus:border-teal-600 outline-none transition-all text-slate-700 bg-slate-50 hover:bg-white"
                  />
                </div>
              </div>
              
              {activeTab !== 'appointment' && (
                <div className="space-y-1.5 flex flex-col">
                  <label className="text-sm font-semibold text-slate-700">To Date</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Calendar className="h-4 w-4 text-slate-400" />
                    </div>
                    <input 
                      type="date" 
                      defaultValue="2026-05-22"
                      className="block w-full pl-10 pr-3 py-2 border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-teal-600 focus:border-teal-600 outline-none transition-all text-slate-700 bg-slate-50 hover:bg-white"
                    />
                  </div>
                </div>
              )}

              {activeTab === 'discharge' && (
                <div className="space-y-1.5 flex flex-col lg:col-span-2">
                  <label className="text-sm font-semibold text-slate-700">UHID / Patient Name</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Search className="h-4 w-4 text-slate-400" />
                    </div>
                    <input 
                      type="text" 
                      placeholder="Search records..."
                      className="block w-full pl-10 pr-3 py-2 border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-teal-600 focus:border-teal-600 outline-none transition-all text-slate-700 bg-slate-50 hover:bg-white"
                    />
                  </div>
                </div>
              )}
              
              {activeTab === 'user-collection' && (
                <>
                  <div className="space-y-1.5 flex flex-col">
                    <label className="text-sm font-semibold text-slate-700">Doctor Name</label>
                    <div className="relative">
                      <select className="block w-full pl-3 pr-10 py-2 border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-teal-600 focus:border-teal-600 outline-none transition-all text-slate-700 bg-slate-50 hover:bg-white appearance-none">
                        <option>ALL</option>
                        <option>Dr. Arun Sharma</option>
                        <option>Dr. Joy Singh</option>
                        <option>Dr. S. Digendra</option>
                      </select>
                      <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                        <ChevronDown className="h-4 w-4 text-slate-400" />
                      </div>
                    </div>
                  </div>
                  <div className="space-y-1.5 flex flex-col">
                    <label className="text-sm font-semibold text-slate-700">Location</label>
                    <div className="relative">
                      <select className="block w-full pl-3 pr-10 py-2 border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-teal-600 focus:border-teal-600 outline-none transition-all text-slate-700 bg-slate-50 hover:bg-white appearance-none">
                        <option>All</option>
                        <option>Main Branch</option>
                        <option>South Clinic</option>
                      </select>
                      <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                        <ChevronDown className="h-4 w-4 text-slate-400" />
                      </div>
                    </div>
                  </div>
                  <div className="space-y-1.5 flex flex-col">
                    <label className="text-sm font-semibold text-slate-700">User Name</label>
                    <div className="relative">
                      <select className="block w-full pl-3 pr-10 py-2 border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-teal-600 focus:border-teal-600 outline-none transition-all text-slate-700 bg-slate-50 hover:bg-white appearance-none">
                        <option>All</option>
                        <option>Admin User</option>
                        <option>Billing Exec</option>
                      </select>
                      <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                        <ChevronDown className="h-4 w-4 text-slate-400" />
                      </div>
                    </div>
                  </div>
                  <div className="space-y-1.5 flex flex-col">
                    <label className="text-sm font-semibold text-slate-700">Payment Mode</label>
                    <div className="relative">
                      <select className="block w-full pl-3 pr-10 py-2 border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-teal-600 focus:border-teal-600 outline-none transition-all text-slate-700 bg-slate-50 hover:bg-white appearance-none">
                        <option>All</option>
                        <option>Cash</option>
                        <option>Card</option>
                        <option>UPI</option>
                      </select>
                      <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                        <ChevronDown className="h-4 w-4 text-slate-400" />
                      </div>
                    </div>
                  </div>
                  <div className="space-y-1.5 flex flex-col">
                    <label className="text-sm font-semibold text-slate-700">Category Type</label>
                    <div className="relative">
                      <select className="block w-full pl-3 pr-10 py-2 border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-teal-600 focus:border-teal-600 outline-none transition-all text-slate-700 bg-slate-50 hover:bg-white appearance-none">
                        <option>All</option>
                        <option>OPD</option>
                        <option>IPD</option>
                      </select>
                      <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                        <ChevronDown className="h-4 w-4 text-slate-400" />
                      </div>
                    </div>
                  </div>
                </>
              )}

              {activeTab === 'death' && (
                <>
                  <div className="space-y-1.5 flex flex-col">
                    <label className="text-sm font-semibold text-slate-700">Department</label>
                    <div className="relative">
                      <select className="block w-full pl-3 pr-10 py-2 border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-teal-600 focus:border-teal-600 outline-none transition-all text-slate-700 bg-slate-50 hover:bg-white appearance-none">
                        <option>ALL</option>
                        <option>General Medicine</option>
                        <option>General Surgery</option>
                        <option>Neurology</option>
                      </select>
                      <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                        <ChevronDown className="h-4 w-4 text-slate-400" />
                      </div>
                    </div>
                  </div>
                  <div className="space-y-1.5 flex flex-col">
                    <label className="text-sm font-semibold text-slate-700">User Type</label>
                    <div className="relative">
                      <select className="block w-full pl-3 pr-10 py-2 border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-teal-600 focus:border-teal-600 outline-none transition-all text-slate-700 bg-slate-50 hover:bg-white appearance-none">
                        <option>ALL</option>
                        <option>Admin</option>
                        <option>Doctor</option>
                        <option>Staff</option>
                      </select>
                      <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                        <ChevronDown className="h-4 w-4 text-slate-400" />
                      </div>
                    </div>
                  </div>
                </>
              )}

              {activeTab === 'appointment' && (
                <>
                   <div className="space-y-1.5 flex flex-col">
                    <label className="text-sm font-semibold text-slate-700">Department</label>
                    <div className="relative">
                      <select className="block w-full pl-3 pr-10 py-2 border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-teal-600 focus:border-teal-600 outline-none transition-all text-slate-700 bg-slate-50 hover:bg-white appearance-none">
                        <option>ALL</option>
                        <option>General Medicine</option>
                        <option>Neurology</option>
                        <option>Cardiology</option>
                      </select>
                      <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                        <ChevronDown className="h-4 w-4 text-slate-400" />
                      </div>
                    </div>
                  </div>
                  <div className="space-y-1.5 flex flex-col">
                    <label className="text-sm font-semibold text-slate-700">Status & Payment</label>
                     <div className="flex gap-2">
                      <div className="relative flex-1">
                        <select className="block w-full pl-3 pr-8 py-2 border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-teal-600 focus:border-teal-600 outline-none transition-all text-slate-700 bg-slate-50 hover:bg-white appearance-none">
                          <option>All Status</option>
                          <option>Confirmed</option>
                          <option>Unconfirmed</option>
                        </select>
                        <div className="absolute inset-y-0 right-0 pr-2 flex items-center pointer-events-none">
                          <ChevronDown className="h-4 w-4 text-slate-400" />
                        </div>
                      </div>
                      <div className="relative flex-1">
                        <select className="block w-full pl-3 pr-8 py-2 border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-teal-600 focus:border-teal-600 outline-none transition-all text-slate-700 bg-slate-50 hover:bg-white appearance-none">
                          <option>All Payment</option>
                          <option>Paid</option>
                          <option>UnPaid</option>
                        </select>
                        <div className="absolute inset-y-0 right-0 pr-2 flex items-center pointer-events-none">
                          <ChevronDown className="h-4 w-4 text-slate-400" />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-1.5 flex flex-col">
                    <label className="text-sm font-semibold text-slate-700">Doctor</label>
                    <div className="relative">
                      <select className="block w-full pl-3 pr-10 py-2 border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-teal-600 focus:border-teal-600 outline-none transition-all text-slate-700 bg-slate-50 hover:bg-white appearance-none">
                        <option>ALL</option>
                        <option>Dr. Arun Sharma</option>
                        <option>Dr. Joy Singh</option>
                        <option>Dr. Meera Menon</option>
                      </select>
                      <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                        <ChevronDown className="h-4 w-4 text-slate-400" />
                      </div>
                    </div>
                  </div>
                </>
              )}
            </div>

            <div className="flex space-x-3 shrink-0 mt-4 lg:mt-0 lg:w-auto self-end">
              <button className="bg-teal-700 hover:bg-teal-800 text-white px-6 py-2 rounded-lg font-medium text-sm transition-colors shadow-sm flex items-center justify-center min-h-[38px] flex-1">
                Search
              </button>
              <button className="bg-white hover:bg-slate-50 text-slate-700 border border-slate-300 px-6 py-2 rounded-lg font-medium text-sm transition-colors text-center min-h-[38px] shadow-sm flex-1">
                Back
              </button>
            </div>
            
          </div>
        </section>

        {/* DATA TABLE SECTION */}
        <section className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden flex flex-col">
          {/* Table Toolbar */}
          <div className={`px-6 py-4 border-b border-slate-200 flex flex-col md:flex-row md:items-center justify-between bg-white gap-4`}>
            <div className="flex flex-col md:flex-row md:items-center space-y-2 md:space-y-0 md:space-x-6">
              <h2 className="text-lg font-bold text-slate-800">
                {activeTab === 'discharge' && 'Discharge Summary Records'}
                {activeTab === 'death' && 'Death Statistics'}
                {activeTab === 'appointment' && 'Appointment Details'}
                {activeTab === 'user-collection' && 'User Collection Report'}
              </h2>
              {activeTab === 'appointment' && (
                <div className="flex items-center space-x-6 text-sm">
                  <div className="flex items-center"><div className="w-3 h-3 bg-teal-500 rounded-xs mr-2"></div><span className="text-slate-600 font-medium">Confirmed</span></div>
                  <div className="flex items-center"><div className="w-3 h-3 bg-red-500 rounded-xs mr-2"></div><span className="text-slate-600 font-medium">Unconfirmed</span></div>
                </div>
              )}
            </div>
            {activeTab === 'death' && (
              <button 
                onClick={() => setIsPrintingDeathStats(true)}
                className="bg-teal-700 hover:bg-teal-800 text-white px-4 py-1.5 rounded text-sm font-medium transition-colors shadow-sm inline-flex items-center shrink-0"
              >
                <Printer className="w-4 h-4 mr-1.5" />
                Print
              </button>
            )}
            {activeTab === 'user-collection' && (
              <button 
                onClick={() => setIsPrintingUserCollection(true)}
                className="bg-teal-700 hover:bg-teal-800 text-white px-4 py-1.5 rounded text-sm font-medium transition-colors shadow-sm inline-flex items-center shrink-0"
              >
                <Printer className="w-4 h-4 mr-1.5" />
                Print List
              </button>
            )}
          </div>

          

          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left align-middle border-collapse">
              <thead className="bg-[#0159a6] text-white font-medium border-b border-blue-100">
                {activeTab === 'discharge' && (
                  <tr>
                    <th className="px-6 py-3.5 w-16 whitespace-nowrap">Sr. No.</th>
                    <th className="px-6 py-3.5 whitespace-nowrap">UHID</th>
                    <th className="px-6 py-3.5 whitespace-nowrap">Patient Name</th>
                    <th className="px-6 py-3.5 whitespace-nowrap">IP No.</th>
                    <th className="px-6 py-3.5 hidden md:table-cell whitespace-nowrap">Department</th>
                    <th className="px-6 py-3.5 hidden lg:table-cell whitespace-nowrap">Unit</th>
                    <th className="px-6 py-3.5 whitespace-nowrap">Doctor Name</th>
                    <th className="px-6 py-3.5 text-right whitespace-nowrap">Action</th>
                  </tr>
                )}
                {activeTab === 'death' && (
                  <tr>
                    <th className="px-6 py-3.5 w-20 text-center whitespace-nowrap">S. No.</th>
                    <th className="px-6 py-3.5 whitespace-nowrap">Department</th>
                    <th className="px-6 py-3.5 text-center whitespace-nowrap">Male</th>
                    <th className="px-6 py-3.5 text-center whitespace-nowrap">Female</th>
                  </tr>
                )}
                {activeTab === 'appointment' && (
                  <tr>
                    <th className="py-3.5 w-2 p-0"></th> {/* Indicator col */}
                    <th className="px-4 py-3.5 w-16 whitespace-nowrap text-center">S. No.</th>
                    <th className="px-6 py-3.5 whitespace-nowrap">Doctor</th>
                    <th className="px-6 py-3.5 whitespace-nowrap">UHID</th>
                    <th className="px-6 py-3.5 whitespace-nowrap">Patient Name</th>
                    <th className="px-6 py-3.5 whitespace-nowrap text-center">Age</th>
                    <th className="px-6 py-3.5 whitespace-nowrap">Category</th>
                    <th className="px-6 py-3.5 whitespace-nowrap">Time</th>
                    <th className="px-6 py-3.5 whitespace-nowrap">Type</th>
                    <th className="px-6 py-3.5 whitespace-nowrap">Payment Status</th>
                  </tr>
                )}
                {activeTab === 'user-collection' && (
                  <tr className="text-xs">
                    <th className="px-3 py-3 whitespace-nowrap">S.No.</th>
                    <th className="px-3 py-3 whitespace-nowrap">Date</th>
                    <th className="px-3 py-3 whitespace-nowrap">UHID</th>
                    <th className="px-3 py-3 whitespace-nowrap">OP No.</th>
                    <th className="px-3 py-3 whitespace-nowrap">Patient</th>
                    <th className="px-3 py-3 whitespace-nowrap">City</th>
                    <th className="px-3 py-3 whitespace-nowrap text-center">Age/Sex</th>
                    <th className="px-3 py-3 whitespace-nowrap">Doctor</th>
                    <th className="px-3 py-3 whitespace-nowrap">Staff</th>
                    <th className="px-3 py-3 whitespace-nowrap">Mode</th>
                    <th className="px-3 py-3 whitespace-nowrap text-right">Amt</th>
                    <th className="px-3 py-3 whitespace-nowrap text-right">Cncl Amt</th>
                  </tr>
                )}
              </thead>
              <tbody>
                {activeTab === 'discharge' && (
                  mockReports.map((report, index) => (
                    <tr key={report.id} className="even:bg-slate-100 odd:bg-white hover:bg-slate-200/50 transition-colors border-b border-slate-200 last:border-0">
                      <td className="px-6 py-3.5 text-slate-600 tabular-nums">{index + 1}</td>
                      <td className="px-6 py-3.5 text-slate-600 uppercase">{report.uhid}</td>
                      <td className="px-6 py-3.5 text-slate-600">{report.name}</td>
                      <td className="px-6 py-3.5 text-slate-600 uppercase">{report.ipNo}</td>
                      <td className="px-6 py-3.5 text-slate-600 hidden md:table-cell">{report.dept}</td>
                      <td className="px-6 py-3.5 text-slate-600 hidden lg:table-cell">{report.unit}</td>
                      <td className="px-6 py-3.5 text-slate-600">{report.doctor}</td>
                      <td className="px-6 py-3.5 text-right">
                        <button
                          onClick={() => setSelectedReport(report)}
                          className="inline-flex items-center justify-center text-slate-400 hover:text-teal-700 hover:bg-teal-50 p-2 rounded-md transition-colors"
                          title="Print Summary"
                        >
                          <Printer className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  ))
                )}
                {activeTab === 'death' && (
                  <>
                    {mockDeathData.map((data, index) => (
                      <tr key={data.id} className="even:bg-slate-100 odd:bg-white hover:bg-slate-200/50 transition-colors border-b border-slate-200">
                        <td className="px-6 py-3.5 text-slate-600 tabular-nums text-center">{index + 1}</td>
                        <td className="px-6 py-3.5 text-slate-600">{data.department}</td>
                        <td className="px-6 py-3.5 text-slate-600 text-center">{data.male}</td>
                        <td className="px-6 py-3.5 text-slate-600 text-center">{data.female}</td>
                      </tr>
                    ))}
                  </>
                )}
                {activeTab === 'appointment' && (
                  mockAppointments.map((appt, index) => (
                    <tr key={appt.id} className="relative even:bg-slate-100 odd:bg-white hover:bg-slate-200/50 transition-colors border-b border-slate-200 last:border-0 overflow-hidden">
                      <td className="p-0 pl-[2px] w-1 align-top">
                        <div className={`absolute top-0 bottom-0 left-0 w-[6px] ${appt.status === 'Confirmed' ? 'bg-teal-500' : 'bg-red-500'}`}></div>
                      </td>
                      <td className="px-4 py-3.5 text-slate-600 tabular-nums text-center">{appt.sNo}</td>
                      <td className="px-6 py-3.5 text-slate-600 font-medium">{appt.doctor}</td>
                      <td className="px-6 py-3.5 text-slate-600 uppercase">{appt.uhid}</td>
                      <td className="px-6 py-3.5 text-slate-600">{appt.name}</td>
                      <td className="px-6 py-3.5 text-slate-600 text-center">{appt.age}</td>
                      <td className="px-6 py-3.5 text-slate-600">{appt.category}</td>
                      <td className="px-6 py-3.5 text-slate-600 font-medium">{appt.time}</td>
                      <td className="px-6 py-3.5 text-slate-600">{appt.type}</td>
                      <td className={`px-6 py-3.5 font-medium ${appt.paymentStatus === 'Paid' ? 'text-teal-600' : 'text-red-500'}`}>
                        {appt.paymentStatus}
                      </td>
                    </tr>
                  ))
                )}
                {activeTab === 'user-collection' && (
                  mockUserCollections.map((data, index) => (
                    <tr key={data.id} className="even:bg-slate-100 odd:bg-white hover:bg-slate-200/50 transition-colors border-b border-slate-200 last:border-0 text-xs">
                      <td className="px-3 py-2.5 text-slate-600 tabular-nums">{index + 1}</td>
                      <td className="px-3 py-2.5 text-slate-600 whitespace-nowrap">{data.opDate.split(' ')[0]}</td>
                      <td className="px-3 py-2.5 text-slate-600 whitespace-nowrap">{data.uhid}</td>
                      <td className="px-3 py-2.5 text-slate-600 whitespace-nowrap">{data.opNo}</td>
                      <td className="px-3 py-2.5 text-slate-600 whitespace-nowrap truncate max-w-[120px]" title={data.patientName}>{data.patientName}</td>
                      <td className="px-3 py-2.5 text-slate-600 whitespace-nowrap truncate max-w-[80px]" title={data.city}>{data.city}</td>
                      <td className="px-3 py-2.5 text-slate-600 whitespace-nowrap text-center">{data.age}/{data.sex}</td>
                      <td className="px-3 py-2.5 text-slate-600 whitespace-nowrap truncate max-w-[100px]" title={data.consultant}>{data.consultant.replace(/dr\.?\s*/i, '')}</td>
                      <td className="px-3 py-2.5 text-slate-600 whitespace-nowrap truncate max-w-[80px]" title={data.emplName}>{data.emplName}</td>
                      <td className="px-3 py-2.5 text-slate-600 whitespace-nowrap">{data.paymentMode}</td>
                      <td className="px-3 py-2.5 text-slate-600 whitespace-nowrap text-right font-medium">{data.amount.toFixed(2)}</td>
                      <td className="px-3 py-2.5 whitespace-nowrap text-right font-medium text-rose-500">{data.cancelAmount > 0 ? data.cancelAmount.toFixed(2) : '-'}</td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          {/* Footer Area */}
          {activeTab === 'appointment' ? (
            <div className="bg-white px-6 py-4 border-t border-slate-200 mt-auto">
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                <div className="grid grid-cols-2 lg:flex lg:flex-row lg:items-center gap-x-6 gap-y-2 text-sm text-slate-600">
                  <span className="font-semibold">Close Appt: <span className="font-bold text-slate-900 ml-1">10</span></span>
                  <span className="font-semibold">Open Appt: <span className="font-bold text-slate-900 ml-1">5</span></span>
                  <span className="font-semibold">Total Appt: <span className="font-bold text-slate-900 ml-1">15</span></span>
                  <span className="font-semibold">Paid: <span className="font-bold text-teal-600 ml-1">10</span></span>
                  <span className="font-semibold">UnPaid: <span className="font-bold text-rose-600 ml-1">5</span></span>
                  <span className="font-semibold">Ref. Attended: <span className="font-bold text-slate-900 ml-1">2</span></span>
                </div>
                <div className="flex space-x-2 shrink-0 self-end lg:self-auto w-full lg:w-auto">
                  <button className="flex-1 bg-teal-700 hover:bg-teal-800 text-white px-6 py-2 rounded-lg font-medium text-sm transition-colors shadow-sm">
                    Confirm
                  </button>
                  <button className="flex-1 bg-white hover:bg-slate-50 text-slate-700 border border-slate-300 px-6 py-2 rounded-lg font-medium text-sm transition-colors shadow-sm">
                    Refresh
                  </button>
                  <button className="flex-1 bg-rose-50 hover:bg-rose-100 text-rose-600 border border-rose-200 px-6 py-2 rounded-lg font-medium text-sm transition-colors shadow-sm">
                    Exit
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-white px-6 py-4 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-slate-200 mt-auto">
              <span className="text-sm text-slate-500 text-center sm:text-left">
                {activeTab === 'discharge' && 'Showing 1 to 15 of 15 entries'}
                {activeTab === 'death' && `Showing 1 to ${mockDeathData.length} of ${mockDeathData.length} entries`}
                {activeTab === 'user-collection' && `Showing 1 to ${mockUserCollections.length} of ${mockUserCollections.length} entries`}
              </span>
              <div className="hidden md:flex space-x-1">
                <button className="px-3 py-1 border border-slate-200 rounded text-sm bg-slate-50 text-slate-400 cursor-not-allowed font-medium">Previous</button>
                <button className="px-3 py-1 border border-teal-600 bg-teal-50 rounded text-sm text-teal-700 font-medium shadow-sm">1</button>
                <button className="px-3 py-1 border border-slate-200 rounded text-sm bg-slate-50 text-slate-400 cursor-not-allowed font-medium">Next</button>
              </div>
            </div>
          )}

          
        </section>

        {activeTab === 'death' && (
            <div className="px-6 py-5 border-b border-slate-200 bg-slate-50">
              <div className="flex flex-col gap-4">
                <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-2">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.25em] text-slate-500">Death Statistics Overview</p>
                   
                  </div>
                  <div className="flex flex-wrap items-center gap-2 text-xs font-medium text-slate-500">
                    <span className="rounded-full border border-slate-200 bg-white px-3 py-1">Period: 01-05-2024 to 22-05-2026</span>
                    <span className="rounded-full border border-slate-200 bg-white px-3 py-1">Departments: {mockDeathData.length}</span>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div className="rounded-xl border border-slate-200 bg-white px-4 py-3 shadow-sm">
                    <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-slate-500">Total Deaths</p>
                    <p className="mt-2 text-3xl font-semibold leading-none text-slate-900 tabular-nums">{grandTotal}</p>
                  </div>
                  <div className="rounded-xl border border-slate-200 bg-white px-4 py-3 shadow-sm">
                    <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-slate-500">Male</p>
                    <p className="mt-2 text-3xl font-semibold leading-none text-slate-900 tabular-nums">{totalMale}</p>
                  </div>
                  <div className="rounded-xl border border-slate-200 bg-white px-4 py-3 shadow-sm">
                    <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-slate-500">Female</p>
                    <p className="mt-2 text-3xl font-semibold leading-none text-slate-900 tabular-nums">{totalFemale}</p>
                  </div>
                </div>
              </div>
            </div>
          )}

        {activeTab === 'user-collection' && (
          <section className="bg-white border border-slate-200 rounded-lg shadow-sm flex flex-col overflow-hidden mb-6">
            <div className="bg-[#fff4f4] px-6 py-3 border-b border-rose-200 flex items-center justify-between">
               <h3 className="text-rose-800 font-bold text-sm tracking-wide uppercase">Cancel Receipts</h3>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-xs text-left align-middle border-collapse">
                <thead className="text-rose-800 font-semibold border-b border-rose-200">
                  <tr>
                    <th className="px-4 py-3 whitespace-nowrap">Pay Type</th>
                    <th className="px-4 py-3 whitespace-nowrap text-right">OP Coll(₹)</th>
                    <th className="px-4 py-3 whitespace-nowrap text-right">OP Cncl(₹)</th>
                    <th className="px-4 py-3 whitespace-nowrap text-right">Ser Bal(₹)</th>
                    <th className="px-4 py-3 whitespace-nowrap text-right">Ser Bal Cncl(₹)</th>
                    <th className="px-4 py-3 whitespace-nowrap text-right">Prev Bal(₹)</th>
                    <th className="px-4 py-3 whitespace-nowrap text-right">Refund(₹)</th>
                    <th className="px-4 py-3 whitespace-nowrap text-right">IP Coll(₹)</th>
                    <th className="px-4 py-3 whitespace-nowrap text-right">IP Adv Cncl(₹)</th>
                    <th className="px-4 py-3 whitespace-nowrap text-right">Ser Amt(₹)</th>
                    <th className="px-4 py-3 whitespace-nowrap text-right">Ser Cncl(₹)</th>
                    <th className="px-4 py-3 whitespace-nowrap text-right font-bold text-rose-900 bg-rose-50 border-l border-rose-100">Total(₹)</th>
                  </tr>
                </thead>
                <tbody>
                  {mockCancelReceipts.length === 0 ? (
                    <tr>
                      <td colSpan={12} className="px-6 py-8 text-center text-slate-500 font-medium text-sm">
                        No Cancel Receipts Found!
                      </td>
                    </tr>
                  ) : (
                    mockCancelReceipts.map(cr => (
                      <tr key={cr.id} className="border-b border-slate-100 last:border-0 hover:bg-slate-50 transition-colors">
                        <td className="px-4 py-3 text-slate-700">{cr.paymentType}</td>
                        <td className="px-4 py-3 text-slate-700 text-right">{cr.opCollection.toFixed(2)}</td>
                        <td className="px-4 py-3 text-slate-700 text-right">{cr.opConsultCancel.toFixed(2)}</td>
                        <td className="px-4 py-3 text-slate-700 text-right">{cr.serBalanceAmount.toFixed(2)}</td>
                        <td className="px-4 py-3 text-slate-700 text-right">{cr.serBalanceCancelled.toFixed(2)}</td>
                        <td className="px-4 py-3 text-slate-700 text-right">{cr.prevBalanceRec.toFixed(2)}</td>
                        <td className="px-4 py-3 text-slate-700 text-right">{cr.refundAmount.toFixed(2)}</td>
                        <td className="px-4 py-3 text-slate-700 text-right">{cr.ipCollection.toFixed(2)}</td>
                        <td className="px-4 py-3 text-slate-700 text-right">{cr.ipAdvCancel.toFixed(2)}</td>
                        <td className="px-4 py-3 text-slate-700 text-right">{cr.serviceAmt.toFixed(2)}</td>
                        <td className="px-4 py-3 text-slate-700 text-right">{cr.serviceCancel.toFixed(2)}</td>
                        <td className="px-4 py-3 text-slate-800 text-right font-bold bg-rose-50 border-l border-rose-100">{cr.totalCollection.toFixed(2)}</td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </section>
        )}

      </main>
    </div>
  );
}

