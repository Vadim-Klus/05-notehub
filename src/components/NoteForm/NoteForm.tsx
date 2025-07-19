import { useFormik } from "formik";
import * as Yup from "yup";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createNote } from "../../services/noteService";
import styles from "./NoteForm.module.css";

const validationSchema = Yup.object({
  title: Yup.string().min(3).max(50).required(),
  content: Yup.string().max(500),
  tag: Yup.string()
    .oneOf(["Todo", "Work", "Personal", "Meeting", "Shopping"])
    .required(),
});

interface NoteFormProps {
  onSuccess: () => void;
}

export default function NoteForm({ onSuccess }: NoteFormProps) {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: createNote,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notes"] });
      onSuccess();
    },
  });

  const formik = useFormik({
    initialValues: { title: "", content: "", tag: "Todo" },
    validationSchema,
    onSubmit: (values) => mutation.mutate(values),
  });

  return (
    <form className={styles.form} onSubmit={formik.handleSubmit}>
      <div className={styles.formGroup}>
        <label htmlFor="title">Title</label>
        <input
          id="title"
          {...formik.getFieldProps("title")}
          className={styles.input}
        />
        <span className={styles.error}>
          {formik.touched.title && formik.errors.title}
        </span>
      </div>

      <div className={styles.formGroup}>
        <label htmlFor="content">Content</label>
        <textarea
          id="content"
          rows={8}
          {...formik.getFieldProps("content")}
          className={styles.textarea}
        />
        <span className={styles.error}>
          {formik.touched.content && formik.errors.content}
        </span>
      </div>

      <div className={styles.formGroup}>
        <label htmlFor="tag">Tag</label>
        <select
          id="tag"
          {...formik.getFieldProps("tag")}
          className={styles.select}
        >
          <option value="Todo">Todo</option>
          <option value="Work">Work</option>
          <option value="Personal">Personal</option>
          <option value="Meeting">Meeting</option>
          <option value="Shopping">Shopping</option>
        </select>
        <span className={styles.error}>
          {formik.touched.tag && formik.errors.tag}
        </span>
      </div>

      <div className={styles.actions}>
        <button
          type="button"
          className={styles.cancelButton}
          onClick={onSuccess}
        >
          Cancel
        </button>
        <button
          type="submit"
          className={styles.submitButton}
          disabled={mutation.isPending}
        >
          Create note
        </button>
      </div>
    </form>
  );
}
