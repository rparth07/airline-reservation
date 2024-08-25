﻿// <auto-generated />
using System;
using Airfare.Data;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;

#nullable disable

namespace Airfare.Data.Migrations
{
    [DbContext(typeof(AirfareContext))]
    [Migration("20220412103345_Deleted-Booking-Model")]
    partial class DeletedBookingModel
    {
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "6.0.0")
                .HasAnnotation("Relational:MaxIdentifierLength", 128);

            SqlServerModelBuilderExtensions.UseIdentityColumns(modelBuilder, 1L, 1);

            modelBuilder.Entity("Airfare.Data.AdminDataModel.AirportDataModel", b =>
                {
                    b.Property<Guid>("AirportId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uniqueidentifier");

                    b.Property<string>("Abbreviation")
                        .IsRequired()
                        .HasColumnType("nvarchar(450)");

                    b.Property<string>("AirportName")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("AirportId");

                    b.HasIndex("Abbreviation")
                        .IsUnique();

                    b.ToTable("AirportData");
                });

            modelBuilder.Entity("Airfare.Data.AdminDataModel.FlightDetailsDataModel", b =>
                {
                    b.Property<Guid>("FlightId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uniqueidentifier");

                    b.Property<Guid>("DestinationAirportId")
                        .HasColumnType("uniqueidentifier");

                    b.Property<TimeSpan>("DestinationArrivalTime")
                        .HasColumnType("time");

                    b.Property<double>("Distance")
                        .HasColumnType("float");

                    b.Property<string>("FlightNumber")
                        .IsRequired()
                        .HasColumnType("nvarchar(450)");

                    b.Property<Guid>("FlightOperatorOperatorId")
                        .HasColumnType("uniqueidentifier");

                    b.Property<int>("OperatingDays")
                        .HasColumnType("int");

                    b.Property<int>("SeatingFormatBusiness")
                        .HasColumnType("int");

                    b.Property<int>("SeatingFormatEconomy")
                        .HasColumnType("int");

                    b.Property<Guid>("SourceAirportId")
                        .HasColumnType("uniqueidentifier");

                    b.Property<TimeSpan>("SourceDepartureTime")
                        .HasColumnType("time");

                    b.Property<int>("TotalSeatBusiness")
                        .HasColumnType("int");

                    b.Property<int>("TotalSeatEconomy")
                        .HasColumnType("int");

                    b.HasKey("FlightId");

                    b.HasIndex("DestinationAirportId");

                    b.HasIndex("FlightNumber")
                        .IsUnique();

                    b.HasIndex("FlightOperatorOperatorId");

                    b.HasIndex("SourceAirportId");

                    b.ToTable("FlightDetails");
                });

            modelBuilder.Entity("Airfare.Data.AdminDataModel.FlightGraphDataModel", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uniqueidentifier");

                    b.Property<string>("DestinationAirport")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("SourceAirport")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<int>("Weight")
                        .HasColumnType("int");

                    b.HasKey("Id");

                    b.ToTable("FlightGraph");
                });

            modelBuilder.Entity("Airfare.Data.AdminDataModel.FlightOperatorDataModel", b =>
                {
                    b.Property<Guid>("OperatorId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uniqueidentifier");

                    b.Property<double>("BaseFare")
                        .HasColumnType("float");

                    b.Property<string>("CompanyName")
                        .IsRequired()
                        .HasColumnType("nvarchar(450)");

                    b.Property<double>("Convience")
                        .HasColumnType("float");

                    b.Property<double>("Tax")
                        .HasColumnType("float");

                    b.HasKey("OperatorId");

                    b.HasIndex("CompanyName")
                        .IsUnique();

                    b.ToTable("FlightOperator");
                });

            modelBuilder.Entity("Airfare.Data.AdminDataModel.FlightDetailsDataModel", b =>
                {
                    b.HasOne("Airfare.Data.AdminDataModel.AirportDataModel", "DestinationAirportData")
                        .WithMany("ArrivalFlights")
                        .HasForeignKey("DestinationAirportId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("Airfare.Data.AdminDataModel.FlightOperatorDataModel", "FlightOperator")
                        .WithMany()
                        .HasForeignKey("FlightOperatorOperatorId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("Airfare.Data.AdminDataModel.AirportDataModel", "SourceAirportData")
                        .WithMany("DepartureFlights")
                        .HasForeignKey("SourceAirportId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("DestinationAirportData");

                    b.Navigation("FlightOperator");

                    b.Navigation("SourceAirportData");
                });

            modelBuilder.Entity("Airfare.Data.AdminDataModel.AirportDataModel", b =>
                {
                    b.Navigation("ArrivalFlights");

                    b.Navigation("DepartureFlights");
                });
#pragma warning restore 612, 618
        }
    }
}
