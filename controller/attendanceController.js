
export const markAttendance = async (req, res) => {
  try {
    const { enrollment_id, batch_name, batch_start_date, session_date, status, remarks } = req.body;
 
    if (!batch_name || !batch_start_date || !session_date || !status||!remarks) {
      return res.status(400).json({ message: "Missing required fields" });
    }
 
    const batch = await Batch.findOne({ name: batch_name, start_date: batch_start_date });
    if (!batch) return res.status(404).json({ message: "Batch not found" });
 
    const batch_id = batch._id;
 
    const trainee = await Enrollment.findById(enrollment_id);
    if (!trainee) return res.status(404).json({ message: "Trainee not found" });
 
    if (trainee.batch_id.toString() !== batch_id.toString()) {
      return res.status(400).json({ message: "Trainee does not belong to this batch" });
    }
 
    const existingAttendance = await AttendanceModel.findOne({ enrollment_id, session_date });
    if (existingAttendance) return res.status(409).json({ message: "Attendance already marked" });
 
    const attendance = new AttendanceModel({ enrollment_id, batch_id, session_date, status, remarks: remarks || "" });
    await attendance.save();
 
    return res.status(201).json({ message: "Attendance marked successfully", attendance });
 
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error", error: error.message });
  }
};
 
 
export const updateAttendance = async (req, res) => {
  try {
    const { attendance_id } = req.params;
    const { status, remarks, session_date, batch_name, batch_start_date } = req.body;
 
    const attendance = await AttendanceModel.findById(attendance_id);
    if (!attendance) return res.status(404).json({ message: "Attendance record not found" });
 
    if (status) attendance.status = status;
    if (remarks) attendance.remarks = remarks;
    if (session_date) attendance.session_date = session_date;
 
    if (batch_name && batch_start_date) {
      const batch = await Batch.findOne({ name: batch_name, start_date: batch_start_date });
      if (!batch) return res.status(404).json({ message: "Batch not found" });
      attendance.batch_id = batch._id;
    }
 
    await attendance.save();
    return res.status(200).json({ message: "Attendance updated successfully", attendance });
 
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error", error: error.message });
  }
};
 
 
export const getAttendance = async (req, res) => {
  try {
    const { attendance_id } = req.params;
 
    const attendance = await AttendanceModel.findById(attendance_id)
      .populate("enrollment_id", "name")
      .populate("batch_id", "name start_date");
    if (!attendance) return res.status(404).json({ message: "Attendance record not found" });
 
    return res.status(200).json({ attendance });
 
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error", error: error.message });
  }
};
 