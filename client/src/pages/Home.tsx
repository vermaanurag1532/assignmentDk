import React from "react";

import useQuery from "hooks/useQuery";
import { ENDPOINTS } from "lib/constants";
import useAxios from "hooks/useAxios";

import TableIcon from "assets/table.png";
import styles from "styles/home.module.css";
import Loading from "components/LoadingText";
import ErrorText from "components/ErrorText";
import { toast } from "react-toastify";

interface Student {
  id: number;
  name: string;
  rollno: number;
  address: string;
  institute: string;
  course: string;
}

const Home = () => {
  const { data, loading, error, refresh } = useQuery<{ data: Student[] }>(
    ENDPOINTS.students.getAll
  );
  const csvApi = useAxios(true);
  const students = data?.data;

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const formData = new FormData();
      formData.append("studentsData", file);
      const { data: success } = await csvApi.fetchData(
        ENDPOINTS.students.upload,
        "post",
        formData
      );

      if (success) {
        refresh();
        toast.success("Students imported successfully");
      } else {
        toast.error("Something went wrong");
      }
    }
  };

  return (
    <main className={styles["content"]}>
      <div className={styles["top-row"]}>
        <div className={styles["top-row-text"]}>
          <h1>Students</h1>
          <p>List of all the students in the database</p>
        </div>
        <div className={styles["actions"]}>
          <label htmlFor="studentsData" className={styles["import-btn"]}>
            Import Students
          </label>
          <input
            type="file"
            name="studentsData"
            id="studentsData"
            className={styles["file-input"]}
            onChange={handleFileUpload}
          />
          <button
            className={styles["download-btn"]}
            onClick={() => window.open(ENDPOINTS.students.donwload)}
          >
            <img src={TableIcon} alt="table" />
            Download as CSV
          </button>
        </div>
      </div>
      {students && (
        <table className={styles["table"]}>
          <thead className={styles["table-header"]}>
            <tr>
              <th>Name</th>
              <th>Roll No</th>
              <th>Address</th>
              <th>Institute</th>
              <th>Course</th>
            </tr>
          </thead>
          <tbody className={styles["table-body"]}>
            {students.map((student) => (
              <tr key={student.id} className={styles["table-row"]}>
                <td>{student.name}</td>
                <td>{student.rollno}</td>
                <td>{student.address}</td>
                <td>{student.institute}</td>
                <td>{student.course}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      <Loading loading={csvApi.loading || loading} />
      <ErrorText error={csvApi.error ? csvApi.error : error} />
    </main>
  );
};

export default Home;
