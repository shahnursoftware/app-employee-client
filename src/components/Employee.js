import { useState, useEffect } from 'react';
import { Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import { Formik } from "formik";
import axios from "axios";

export const Employee = () => {
    const [modal, setModal] = useState(false);
    const [deleteModal, setDeleteModal] = useState(false);
    const [employees, setEmployees] = useState([]);
    const [selectedId, setSelectedId] = useState('');

    useEffect(() => {
        axios.get("https://nimadir.herokuapp.com/api/employee")
            .then((res) => {
                setEmployees(res.data.object);
            })
    }, []);

    const changeModal = () => setModal(!modal);
    const changeDeleteModal = () => setDeleteModal(!deleteModal);
    const saveEmployee = (values) => {
        axios.post('https://nimadir.herokuapp.com/api/employee', values)
            .then((res) => {
                getEmployee();
                changeModal();
            })
    }

    const deleteEmployee = (id) => {
        setSelectedId(id);
        changeDeleteModal();
    }

    const deleteEmployeeConfirm = () => {
        axios.delete(`https://nimadir.herokuapp.com/api/employee/${selectedId}`)
            .then((res) => {
                getEmployee();
                changeDeleteModal();
            })
    }

    const getEmployee = () => {
        axios.get("https://nimadir.herokuapp.com/api/employee")
            .then((res2) => {
                setEmployees(res2.data.object);
            })
    }
    return (
        <>
            <div className="container">
                <div className="row">
                    <div className="col-12">
                        <button type="button" className="btn btn-success ml-auto mt-5 d-block" onClick={changeModal}>Add</button>
                    </div>

                    {employees.map((item, index) => {
                        return (
                            <div className="col-4 mt-3" key={item.id}>
                                <div className="card">
                                    <div className="card-header">
                                        <h4>{item.firstName + " " + item.lastName}</h4>
                                    </div>
                                    <div className="card-body">
                                        <p>Age: <b>{item.age}</b></p>
                                        <p>Salary: <b>${item.salary}</b></p>
                                        <p>Position: <b>{item.position}</b></p>
                                    </div>
                                    <div className="card-footer d-flex justify-content-between align-items-center">
                                        <button type="button" className="btn btn-success">Edit</button>
                                        <button type="button" className="btn btn-danger" onClick={() => deleteEmployee(item.id)}>Delete</button>
                                    </div>
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>

            <Modal isOpen={modal} toggle={changeModal}>
                <ModalHeader>
                    <h4 className="modal-title">Add Employee</h4>
                </ModalHeader>
                <Formik
                    initialValues={{ firstName: '', lastName: '', age: '', salary: '', position: '' }}
                    onSubmit={(values) => saveEmployee(values)}
                >
                    {({
                          values,
                          handleChange,
                          handleSubmit,
                          isSubmitting,
                      }) => (
                        <form onSubmit={handleSubmit}>
                            <ModalBody>
                                <input
                                    type="text"
                                    name="firstName"
                                    onChange={handleChange}
                                    value={values.firstName}
                                    placeholder="First Name"
                                    className="form-control"
                                />
                                <input
                                    type="text"
                                    name="lastName"
                                    onChange={handleChange}
                                    value={values.lastName}
                                    placeholder="Last Name"
                                    className="form-control mt-3"
                                />
                                <input
                                    type="number"
                                    name="age"
                                    onChange={handleChange}
                                    value={values.age}
                                    placeholder="Age"
                                    className="form-control mt-3"
                                />
                                <input
                                    type="number"
                                    name="salary"
                                    onChange={handleChange}
                                    value={values.salary}
                                    placeholder="Salary"
                                    className="form-control mt-3"
                                />
                                <select
                                    name="position"
                                    className="form-control mt-3"
                                    onChange={handleChange}
                                    value={values.position}
                                >
                                    <option>Select Position</option>
                                    <option value="Developer">Developer</option>
                                    <option value="Designer">Designer</option>
                                    <option value="Manager">Manager</option>
                                </select>
                            </ModalBody>
                            <ModalFooter>
                                <button type="submit" className="btn btn-success" disabled={isSubmitting}>Add</button>
                                <button type="button" className="btn btn-secondary" onClick={changeModal}>Cancel</button>
                            </ModalFooter>
                        </form>
                    )}
                </Formik>
            </Modal>

            <Modal isOpen={deleteModal} toggle={changeDeleteModal}>
                <ModalBody>
                    <h5>Rostdan ham o'chirmoqchimisiz?</h5>
                </ModalBody>
                <ModalFooter>
                    <button type="button" className="btn btn-danger" onClick={deleteEmployeeConfirm}>Ha</button>
                    <button type="button" className="btn btn-secondary" onClick={changeDeleteModal}>Yo'q</button>
                </ModalFooter>
            </Modal>
        </>
    );
};