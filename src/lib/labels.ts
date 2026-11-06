import type { Course, Payment, Status } from "@/generated/database/enums";

export const courseTitles: Record<Course, string> = {
  algorithms: "Основы алгоритмизации и программирования",
  webdesign: "Основы веб-дизайна",
  databases: "Основы проектирования баз данных",
};

export const paymentTitles: Record<Payment, string> = {
  cash: "Наличными",
  phone_transfer: "Переводом по номеру телефона",
};

export const statusTitles: Record<Status, string> = {
  new: "Новая",
  in_progress: "Идет обучение",
  completed: "Обучение завершено",
};

export const availableCourses = Object.keys(courseTitles) as Course[];
export const availablePayments = Object.keys(paymentTitles) as Payment[];

const russianDateFormatter = new Intl.DateTimeFormat("ru-RU");

export function formatDate(value: Date): string {
  return russianDateFormatter.format(value);
}
