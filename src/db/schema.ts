// Importa a função de relacionamentos entre tabelas do Drizzle ORM
import { relations } from "drizzle-orm";
// Importa tipos e funções do Drizzle para criação de tabelas e colunas PostgreSQL
import {
  integer,
  pgEnum,
  pgTable,
  text,
  time,
  timestamp,
  uuid,
} from "drizzle-orm/pg-core";

///////////////////////
// TABELA: users
///////////////////////
// Representa os usuários da plataforma (ex: administradores, recepcionistas, etc.)
export const usersTable = pgTable("users", {
  id: uuid("id").defaultRandom().primaryKey(), // ID único (UUID), gerado automaticamente
});

// Relacionamentos da tabela users
export const usersTableRelations = relations(usersTable, ({ many }) => ({
  // Um usuário pode estar associado a muitas clínicas (tabela de associação usersToClinicsTable)
  usersToClinics: many(usersToClinicsTable),
}));

///////////////////////
// TABELA: clinics
///////////////////////
// Representa as clínicas cadastradas no sistema
export const clinicsTable = pgTable("clinics", {
  id: uuid("id").defaultRandom().primaryKey(),
  name: text("name").notNull(), // Nome da clínica
  createdAt: timestamp("created_at").defaultNow().notNull(), // Data de criação
  updatedAt: timestamp("updated_at")
    .defaultNow()
    .$onUpdate(() => new Date()), // Atualiza automaticamente ao editar
});

// Relacionamentos da tabela clinics
export const clinicsTableRelations = relations(clinicsTable, ({ many }) => ({
  doctors: many(doctorsTable), // Uma clínica pode ter vários médicos
  patients: many(patientsTable), // Uma clínica pode ter vários pacientes
  appointments: many(appointmentsTable), // Uma clínica pode ter várias consultas
  usersToClinics: many(usersToClinicsTable), // Relacionamento com usuários
}));

///////////////////////
// TABELA: users_to_clinics
///////////////////////
// Tabela de associação entre usuários e clínicas (muitos para muitos)
export const usersToClinicsTable = pgTable("users_to_clinics", {
  userId: uuid("user_id")
    .notNull()
    .references(() => usersTable.id), // FK para users
  clinicId: uuid("clinic_id")
    .notNull()
    .references(() => clinicsTable.id), // FK para clinics
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at")
    .defaultNow()
    .$onUpdate(() => new Date()),
});

// Relacionamentos da tabela de associação users_to_clinics
export const usersToClinicsTableRelations = relations(
  usersToClinicsTable,
  ({ one }) => ({
    user: one(usersTable, {
      fields: [usersToClinicsTable.userId],
      references: [usersTable.id],
    }),
    clinic: one(clinicsTable, {
      fields: [usersToClinicsTable.clinicId],
      references: [clinicsTable.id],
    }),
  }),
);

///////////////////////
// TABELA: doctors
///////////////////////
// Representa os médicos cadastrados
export const doctorsTable = pgTable("doctors", {
  id: uuid("id").defaultRandom().primaryKey(),
  clinicId: uuid("clinic_id")
    .notNull()
    .references(() => clinicsTable.id, { onDelete: "cascade" }), // FK para clínica com delete em cascata
  name: text("name").notNull(), // Nome do médico
  avatarImageUrl: text("avatar_image_url"), // Imagem de perfil
  availableFromWeekDay: integer("available_from_week_day").notNull(), // Dia da semana disponível (ex: 1 = segunda)
  availableToWeekDay: integer("available_to_week_day").notNull(), // Último dia da semana disponível
  availableFromTime: time("available_from_time").notNull(), // Horário inicial de atendimento
  availableToTime: time("available_to_time").notNull(), // Horário final de atendimento
  specialty: text("specialty").notNull(), // Especialidade médica
  appointmentPriceInCents: integer("appointment_price_in_cents").notNull(), // Preço por consulta (em centavos)
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at")
    .defaultNow()
    .$onUpdate(() => new Date()),
});

// Relacionamentos da tabela doctors
export const doctorsTableRelations = relations(
  doctorsTable,
  ({ many, one }) => ({
    clinic: one(clinicsTable, {
      fields: [doctorsTable.clinicId],
      references: [clinicsTable.id],
    }),
    appointments: many(appointmentsTable), // Um médico pode ter várias consultas
  }),
);

///////////////////////
// ENUM: patient_sex
///////////////////////
// Enumeração de sexo para pacientes
export const patientSexEnum = pgEnum("patient_sex", ["male", "female"]);

///////////////////////
// TABELA: patients
///////////////////////
// Representa os pacientes cadastrados
export const patientsTable = pgTable("patients", {
  id: uuid("id").defaultRandom().primaryKey(),
  clinicId: uuid("clinic_id")
    .notNull()
    .references(() => clinicsTable.id, { onDelete: "cascade" }), // FK para clínica
  name: text("name").notNull(), // Nome do paciente
  email: text("email").notNull(), // Email de contato
  phoneNumber: text("phone_number").notNull(), // Telefone
  createdAt: timestamp("created_at").defaultNow().notNull(),
  sex: patientSexEnum("sex").notNull(), // Sexo (male ou female)
  updatedAt: timestamp("updated_at")
    .defaultNow()
    .$onUpdate(() => new Date()),
});

// Relacionamentos da tabela patients
export const patientsTableRelations = relations(
  patientsTable,
  ({ one, many }) => ({
    clinic: one(clinicsTable, {
      fields: [patientsTable.clinicId],
      references: [clinicsTable.id],
    }),
    appointments: many(appointmentsTable), // Um paciente pode ter várias consultas
  }),
);

///////////////////////
// TABELA: appointments
///////////////////////
// Representa as consultas médicas agendadas
export const appointmentsTable = pgTable("appointments", {
  id: uuid("id").defaultRandom().primaryKey(),
  date: timestamp("date").notNull(), // Data e hora da consulta
  clinicId: uuid("clinic_id")
    .notNull()
    .references(() => clinicsTable.id, { onDelete: "cascade" }), // FK para clínica
  patientId: uuid("patient_id")
    .notNull()
    .references(() => patientsTable.id, { onDelete: "cascade" }), // FK para paciente
  doctorId: uuid("doctor_id")
    .notNull()
    .references(() => doctorsTable.id, { onDelete: "cascade" }), // FK para médico
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at")
    .defaultNow()
    .$onUpdate(() => new Date()),
});

// Relacionamentos da tabela appointments
export const appointmentsTableRelations = relations(
  appointmentsTable,
  ({ one }) => ({
    clinic: one(clinicsTable, {
      fields: [appointmentsTable.clinicId],
      references: [clinicsTable.id],
    }),
    patient: one(patientsTable, {
      fields: [appointmentsTable.patientId],
      references: [patientsTable.id],
    }),
    doctor: one(doctorsTable, {
      fields: [appointmentsTable.doctorId],
      references: [doctorsTable.id],
    }),
  }),
);
