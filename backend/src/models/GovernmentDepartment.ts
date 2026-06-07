import mongoose, { Document, Schema } from 'mongoose';

/* ─── Sub-document schemas ─────────────────────────────────────────────────── */

const ContactSchema = new Schema(
  {
    phone:   { type: String, default: '' },
    email:   { type: String, default: '' },
    website: { type: String, default: '' },
    address: { type: String, default: '' },
  },
  { _id: false }
);

const ProjectSchema = new Schema(
  {
    name:      { type: String, required: true },
    progress:  { type: Number, min: 0, max: 100, default: 0 },
    budget:    { type: Number, default: 0 },
    spent:     { type: Number, default: 0 },
    deadline:  { type: Date },
    status:    { type: String, enum: ['on-track', 'delayed', 'completed', 'paused'], default: 'on-track' },
    evidence:  { type: String, default: '' },
  },
  { timestamps: true }
);

const FinancialRecordSchema = new Schema(
  {
    category:         { type: String, required: true },
    allocated:        { type: Number, default: 0 },
    spent:            { type: Number, default: 0 },
    quarter:          { type: String, default: '' },   // e.g. "Q1 2026"
    verificationLink: { type: String, default: '' },
  },
  { _id: false }
);

const UpdateSchema = new Schema(
  {
    date:        { type: Date, default: Date.now },
    title:       { type: String, required: true },
    description: { type: String, default: '' },
    evidence:    { type: String, default: '' },
    verifiedBy:  { type: String, default: '' },
  },
  { _id: false }
);

const DatasetSchema = new Schema(
  {
    name:    { type: String, required: true },
    size:    { type: String, default: '' },
    format:  { type: String, enum: ['CSV', 'XLSX', 'PDF', 'JSON', 'XML'], default: 'CSV' },
    updated: { type: Date, default: Date.now },
    url:     { type: String, default: '' },   // download URL (future use)
  },
  { _id: false }
);

/* ─── Main Department Document ─────────────────────────────────────────────── */

export interface IGovernmentDepartment extends Document {
  name:             string;
  nameBangla:       string;
  hierarchy:        string;
  establishedYear:  number;
  headOfficer:      string;
  jurisdiction:     string;
  contact:          {
    phone: string;
    email: string;
    website: string;
    address: string;
  };
  responsibilities: string[];
  personnelCount:   number;
  efficiencyScore:  number;   // percentage 0-100

  projects:         mongoose.Types.DocumentArray<any>;
  financials:       any[];
  updates:          any[];
  datasets:         any[];

  isVerified:       boolean;
  createdAt:        Date;
  updatedAt:        Date;
}

const GovernmentDepartmentSchema = new Schema<IGovernmentDepartment>(
  {
    name:             { type: String, required: true, trim: true },
    nameBangla:       { type: String, default: '' },
    hierarchy:        { type: String, default: '' },
    establishedYear:  { type: Number },
    headOfficer:      { type: String, default: '' },
    jurisdiction:     { type: String, default: '' },
    contact:          { type: ContactSchema, default: () => ({}) },
    responsibilities: [{ type: String }],
    personnelCount:   { type: Number, default: 0 },
    efficiencyScore:  { type: Number, min: 0, max: 100, default: 0 },

    projects:         [ProjectSchema],
    financials:       [FinancialRecordSchema],
    updates:          [UpdateSchema],
    datasets:         [DatasetSchema],

    isVerified:       { type: Boolean, default: true },
  },
  {
    timestamps:  true,
    collection:  'government_departments',
  }
);

export default mongoose.model<IGovernmentDepartment>(
  'GovernmentDepartment',
  GovernmentDepartmentSchema
);
