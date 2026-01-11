import styles from "./VehicleDetails.module.css";

const VehicleDetails = ({ camper }) => {
  const formatDetail = (key, value) => {
    const formattedKey = key.charAt(0).toUpperCase() + key.slice(1);
    let formattedValue = value;
    if (key === "tank") {
      formattedValue = `${value} l`;
    }
    if (key === "consumption") {
      formattedValue = `${value} l/100km`;
    }
    if (["length", "width", "height"].includes(key)) {
      formattedValue = `${value} m`;
    }
    return (
      <div key={key} className={styles.detailRow}>
        <span>{formattedKey}</span>
        <span>{formattedValue}</span>
      </div>
    );
  };
  return (
    <div className={styles.vehicleDetails}>
      {formatDetail("form", camper.form)}
      {formatDetail("length", camper.length)}

      {formatDetail("width", camper.width)}
      {formatDetail("height", camper.height)}

      {formatDetail("tank", camper.tank)}
      {formatDetail("consumption", camper.consumption)}
    </div>
  );
};

export default VehicleDetails;
